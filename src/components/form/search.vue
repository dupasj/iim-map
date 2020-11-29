<template>
  <form class="search-form-container" autocomplete="off">
    <input :value="value" v-on:keydown="update" v-on:blur="blur" v-on:focus="focus" class="search-input" name="q" type="search" placeholder="Rechercher une ville"/>
  </form>
</template>

<script>

export default {
  name: 'SearchFormContainer',
  components: {

  },
  props: {
    value: {
      default: "",
      type: String,
    },
  },
  methods: {
    focus: function(){
      this.$emit("focus");
    },
    blur: function(){
      this.$emit("blur");
    },
    update: function(value){
      setTimeout(() => {
        this.$emit("update",value.target.value);
      });
    }
  }
}
</script>
<style>
.search-form-container{
  width:100%;
  height:auto;
  display:block;
  padding:0;
  margin:0;
}
.search-form-container .search-input:focus{
  outline: none;
  border: 0 none transparent;
}
.search-form-container .search-input{
  width:100%;
  height:auto;
  line-height:1.5;
  font-size:17px;
  color:#000;
  display:block;
  padding:7px 17px;
  margin:0;
  outline: none;
  border: 0 none transparent;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(75,75,75,0.7);
}
</style>
