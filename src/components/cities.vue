<template>
  <ul :class="{'cities':true,'loading':loading}">
    <li v-for="city in cities" :key="city.osm_id" v-on:click="() => select(city)">
      <strong>{{city.display_name.split(',')[0].trim()}}</strong>
      <span>{{city.display_name.split(',')[1].trim()}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Cities',
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    cities: {
      default: function(){
        return [];
      },
      type: Array
    }
  },
  methods: {
    select: function(city){
      this.$emit("select",city);
    }
  }
}
</script>
<style>
.cities{
  width:100%;
  height:auto;
  display:block;
  padding:0;
  margin:0;
  list-style: none;
  transition:0.2s opacity,0.2s filter;
}
.cities.loading{
  opacity:0.7;
  filter:blur(7px);
}

.cities li:not(:first-child):before{
  height:1px;
  width:80%;
  position:absolute;
  left:10%;
  top:0;
  background-color: black;
  display:block;content:"";
}

.cities li{
  position:relative;
  width:100%;
  height:auto;
  display:block;
  padding:10px 25px;
  margin:0;
  font-size:20px;
  box-sizing: border-box;
  cursor: pointer;
}

.cities li strong{

}
.cities li span:before{
  content: ", ";
}
.cities li span{
  opacity:0.7;
}
</style>
