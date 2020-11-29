<template>
  <div class="app">
    <div id="map" class="map"></div>
    <SearchContainer v-on:select="select" :loading="loading" :cities="cities" :value="search" :active="active" v-on:update="update" v-on:blur="blur" v-on:focus="focus"/>
  </div>
</template>

<script>

import SearchContainer from "@/components/search";
import axios from "axios";
import L from "leaflet";
export default {
  name: 'App',
  components: {
    SearchContainer
  },
  mounted() {
    const map = L.map("map",{
      zoomControl: false
    }).setView([this.position.lat,this.position.long], 13);

    L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // @ts-ignore
    this.map = map;
  },
  data: function(){
    return {
      focused: false,
      search: "",
      // eslint-disable-next-line vue/no-reserved-keys
      _cancel_search: null,
      // eslint-disable-next-line vue/no-reserved-keys
      _select: null,
      map: null,
      geojson: null,
      position: {
        lat: 48.8589507,
        long: 2.2770205,
      },
      cities: []
    }
  },
  methods: {
    select: function(city){
      this._select = city;
      this.position.long = city.lon;
      this.position.lat = city.lat;

      if (this.geojson !== null){
        this.geojson.remove();
        this.geojson = null;
      }

      if (this.map !== null && typeof this.map !== "undefined"){
        this.geojson = new L.GeoJSON(city.geojson,{
          style: {
            color: 'black',
            weight: 1,
            fillOpacity: 0.5,
            fillColor: 'red',
          }
        });

        const converted = city.boundingbox.map((i) => Number(i));
        const bounds = [
          [converted[0],converted[1]],
          [converted[2],converted[3]],
        ]

        this.map.fitBounds(bounds);
        this.geojson.addTo(this.map);
        this.map.setView([this.position.lat,this.position.long], 13);
      }
    },
    cancel_search(){
      if (typeof this._cancel_search === "function"){
        this._cancel_search();
        this._cancel_search = null;
      }
    },

    focus: function(){
      this.focused = true;
    },
    blur: function(){
      this.focused = false;
    },
    update: async function(value){
      value = value.trim();
      if (value === this.search){
        return;
      }

      this.cancel_search();

      if (value.length <= 0){
        return;
      }

      console.log(value);

      try{
        const result = await axios.get("https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&q="+encodeURI(value), {
          cancelToken: new axios.CancelToken((cancel_search) => {
            this._cancel_search = cancel_search;
          })
        });

        this.cities = result.data.filter((item) => (
            item.display_name.split(',').length > 1
        )).sort(function(a,b){
          return b.importance - a.importance;
        });
        this._cancel_search = null;
        // eslint-disable-next-line no-empty
      }catch (e){

      }
    }
  },
  computed: {
    active: function(){
      return this.focused || this.loading || this.cities.length > 0;
    },
    loading: function(){
      return this._cancel_search !== null;
    }
  }
}
</script>
<style>
.app {
  height:100%;
  width:100%;
  position:absolute;
  left:0;
  top:0;
  padding:0;
  margin:0;
}
.map{
  position:absolute;
  left:0;
  top:0;
  height:100%;
  width:100%;
  overflow: hidden;
}

@import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
.leaflet-pane{
  z-index: 0;
}
</style>
