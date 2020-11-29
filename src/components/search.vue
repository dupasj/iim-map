<template>
  <div :class="{'search-container': true,'active': active}">
    <SearchFormContainer :value="search" v-on:update="update" v-on:focus="focus" v-on:blur="blur"/>
    <Cities v-on:select="select" :cities="cities" :loading="loading"/>
  </div>
</template>

<script>

import Cities from "@/components/cities";
import SearchFormContainer from "@/components/form/search";
export default {
  name: 'SearchContainer',
  props: {
    search: {
      default: "",
      type: String,
    },
    active: {
      default: false,
      type: Boolean
    },
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
  components: {
    Cities,
    SearchFormContainer,
  },
  methods: {
    focus: function(){
      this.$emit("focus");
    },
    blur: function(){
      this.$emit("blur");
    },
    update: function(value){
      this.$emit("update",value);
    },
    select: function(value){
      this.$emit("select",value);
    }
  }
}
</script>
<style>
.search-container{
  position:absolute;
  left:10px;
  top:10px;
  padding:10px 10px 30px 10px;
  box-sizing: border-box;
  height:auto;
  width:370px;
  background-color: rgba(0,0,0,0);
  transition:0.2s background-color;
}
.search-container.active{
  background-color: rgba(255,255,255,1);
}
</style>
