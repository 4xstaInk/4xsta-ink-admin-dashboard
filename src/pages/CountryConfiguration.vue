<template>
  <div class="content">
    <div class="row ">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 
          id="heading"
          class="text-dark"
          >Country configuration</h3>
      <input type="text" v-model="search" class="form-control shadow ml-2" placeholder="Search country name..." style="background-color:white;border-radius:15px;border:0px;">
    </div>
        </div>
      <div class="col-12">
          <div class="table-responsive text-left shadow" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;"> 
            
            <div v-if="countries == ''" class="no-data-providers">
            <span id="no-data-icon">
              <i class="tim-icons icon-alert-circle-exc"></i
            ></span>
            <h1>No Avaliable Providers</h1>
          </div>

<div class="parent" v-if="countries != ''">
  
<div
 v-for="Data in filteredCountries"
:key="Data.country_iso"
class="country"
>
<router-link :to="'country-configuration/view-country/'+Data.country_iso">
  <img :src="Data.flag" class="images" :title="Data.country_name" />
  <br/>
{{Data.country_name | subStr}}
</router-link> 
</div>
</div>

   <h5
  class="float-left"
   style="
  border-radius:15px;
  color:blue;
  width:100px;
  background-color:lightblue;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> Reload</h5>

          </div>
          
      </div>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import {BaseURL} from "./../helpers/http-common.js";

export default{
  components:{
  
  },
  data() {
    return {
     countries:[],

      //  Country search
              search:'', 
    };
  },
  filters: {
   
  	subStr: function(string) {
    	return string.substring(0,15);
        }
  
  },
    created() {
    this.fetchCountries();
  },
  computed:{
    // Filter method
     filteredCountries() {
       var q ='country_name';
       var p = this.countries.filter(Data =>
        Data[q].toLowerCase().includes(this.search.toLowerCase())
      );
      return p
    }, 
  },
  methods: {
    //   Get all Countries
    fetchCountries() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.countries = response.data.data.countries)
          (this.fetch_loader = false)
        ).catch(
            (this.fetch_loader = false)
        );
    },
  
}
}
</script>
<style scoped>
.no-data-providers {
  color: #bfbfbf;
  text-align: center;
  width: 100%;
}
#no-data-icon {
  font-size: 70px;
}
#heading{
  margin-right:10%;
  border-bottom:2px solid rgba(100, 100, 255, 0.767);
}
#search{
  width:50%;
  border-radius: 50%;
}
ul{
  background-color:lightblue;
  color: blue;
}

.parent {
display: grid;
grid-template-columns: repeat(9, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 1px;
grid-row-gap: 1px;
  background-color: #eeeeee;
  padding:2px;
  border-radius:5px;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 450px;
  margin-bottom: 5px;
}
.images{
    height:25px;
}
.country{
    background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ccc;
  text-align: center;
  font-size:15px;
  border-radius:5px;
  height: 80px;
  padding: 2px;
  transition: 1s;
}
.country:hover{
  box-shadow: 0px 0px 0px white;
  border: 1px solid #0487e1;
  text-align: center;
  cursor:pointer;
  box-shadow: 0px 3px 5px grey;
  transition: 1s;
}
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius:5px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar
{
	width: 5px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

</style>
