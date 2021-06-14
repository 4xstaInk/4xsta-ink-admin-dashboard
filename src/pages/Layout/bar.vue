<template>
  <nav class="navbar navbar-expand-lg navbar-absolute">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" >
          <button type="button"
                  class="navbar-toggler"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)"> Bill Payments</a>
      </div>
    </div>
  </nav>
</template>
<script>

  export default{
    components:{

    },
    data() {
      return {
    
      };
    },
    methods:{
    },
    computed:{
      
    }
  }
</script>
<style>
nav{
  background-color: white;
  height:50px;
}
</style>
