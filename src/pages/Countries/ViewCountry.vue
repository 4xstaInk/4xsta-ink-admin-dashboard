<template>
<div class="content">
    <div class="row">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 
          id="heading"
          class="text-dark"
          style="
          cursor:pointer;
          "
          @click="hasHistory() 
    ? $router.go(-1) 
    : $router.push('/')"
          >Payment Method configuration / <small>{{country.name}}</small></h3>
    </div>
        </div>
        

      <div class="col-12">
          <div class="table-responsive text-left shadow" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;">

            <div v-if="delete_fail != ''" class="alert alert-danger" role="alert">
              {{ delete_fail }}
            </div>
            <div v-if="failure != ''" class="alert alert-warning" role="alert">
              {{ failure }}
            </div>
            <div v-if="success != ''" class="alert alert-success" role="alert">
              {{ success }}
            </div>
              
             <table class="table">
    <tbody>
      <tr>
        <td>Country Name</td>
        <td><span v-if="Edit_form == false">{{country.name}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Country_name"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>ID</td>
        <td><span v-if="Edit_form == false">{{country.id}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Id"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Airtime API</td>
        <td><span v-if="Edit_form == false">{{country.airtime_api}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Airtime_api"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
       
       <tr>
        <td>Country Code</td>
        <td><span v-if="Edit_form == false">{{country.country_code}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Country_code"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
                </tr>

                <tr>
        <td>Currency Code</td>
        <td><span v-if="Edit_form == false">{{country.currency_code}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Currency_code"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Currency Name</td>
        <td><span v-if="Edit_form == false">{{country.currency_name}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Currency_name"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Currency Symbol</td>
        <td><span v-if="Edit_form == false">{{country.currency_symbol}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Currency_symbol"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Dial Code</td>
        <td><span v-if="Edit_form == false">{{country.dial_code}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Dial_code"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>electricity API</td>
        <td><span v-if="Edit_form == false">{{country.electricity_api}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Electricity_api"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Flag URL</td>
        <td><span v-if="Edit_form == false">{{country.flag}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Flag"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Payment API</td>
        <td><span v-if="Edit_form == false">{{country.payment_api_id}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Payment_api_id"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>


         </tbody> 
  </table>

  <router-link to="country-configuration">
<h5
 v-if="Edit_form == false"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:20px;
  color:black;
  width:100px;
  background-color:transparent;
  height:30px;
  padding-top:6px;
  text-align:center;"
  @click="hasHistory() 
    ? $router.go(-1) 
    : $router.push('/')"
  ><i class="tim-icons icon-double-left

"></i> Back</h5>
   </router-link>

<h5
 v-if="Edit_form == true"
 @click="Edit_form = false
 success = '';
 failure = '';
 "
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:20px;
  color:black;
  width:100px;
  background-color:transparent;
  height:30px;
  padding-top:6px;
  text-align:center;"
  ><i class="tim-icons icon-double-left

"></i> Back</h5>

   <h5
   @click="getCountryData();
   Edit_form = true;
   delete_fail = '';
   "
    v-if="Edit_form == false"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:5px;
  color:blue;
  width:100px;
  background-color:lightblue;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-pencil"></i> Edit</h5>
   <h5
   v-if="Edit_form == false"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  color:white;
  margin-right:5px;
  width:100px;
  background-color:grey;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-paper"></i> PDF</h5>

   <h5
   @click="open = true"
   v-if="Edit_form == false"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:5px;
  color:black;
  width:100px;
  background-color:yellow;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-trash-simple"></i> DELETE</h5>

  <h5
   v-if="Edit_form == true"
   @click="updateCountry()"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:5px;
  color:white;
  width:100px;
  background-color:green;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-check-2"></i> UPDATE</h5>
          </div>
          
      </div> 

    </div>

    <!-- Modal -->
    <vue-modaltor :visible="open" @hideModal="hideModal" :default-width="'30%'">
           <template #body>
        <div class="text-center">
      <h3 class="text-dark">Please confirm {{country.name}} deletion?</h3>
      <h5 class="text-dark">Note that this is not the usual yada-yada</h5>
      <hr/>
      <div class="btn-group btn-group-sm shadow">
  <button type="button" class="btn btn-light mr-2" @click="hideViewDeleteModal()">No</button>
  <button type="button" class="btn btn-light" @click="deleteCountry()">Yes</button>
</div>
    </div><br/>
      </template>
    </vue-modaltor> 
  </div>
</template>
<script>
import axios from "axios";
import {BaseURL} from "../../helpers/http-common.js";

export default{
  components:{
  
  },
  data() {
    return {
     country:[],
     country_iso: this.$route.params.country_iso,

      view:{
        Country_name:'',
        Id:'',
        Airtime_api:'',
        Country_code:'',
        Currency_code:'',
        Currency_name:'',
        Currency_symbol:'',
        Dial_code:'',
        Electricity_api:'',
        Flag:'',
        Payment_api_id:''
      },

     //  Messages
    success:'',
    failure:'',
    
    delete_fail:'',

    //  Edit Form data
     Edit_form:false,
    // Services
    services:"",

    //   Modal
    open: false,

    // Loader
    fetch_loader:""
    };
  },
   created(){
    this.fetchCountry();
  },
  methods: {
    //   Get all Country
    fetchCountry() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/countries/get-country-by-iso/`+this.country_iso, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.country=response.data.data)
          (this.fetch_loader = false)
        ).catch(
            (this.fetch_loader = false)
        );
    },

    // Update Provider 
    updateCountry(){
        let token = localStorage.getItem("token");

      axios.put(`${BaseURL}/countries/` + this.country_iso, {
            // headers: {
            //     Authorization: `Bearer ${token}`, 
            //   },          
          _method: "PUT",
         name:this.view.Country_name,
         id:this.view.Id,
        airtime_api:this.view.Airtime_api,
        country_code:this.view.Country_code,
        currency_code:this.view.Currency_code,
        currency_name:this.view.Currency_name,
        currency_symbol:this.view.Currency_symbol,
        dial_code:this.view.Dial_code,
        electricity_api:this.view.Electricity_api,
        flag:this.view.Flag,
        payment_api_id:this.view.Payment_api_id
        })
        .then(response => 
        (console.log(response))
             (this.updateSuccess())
        )
        .catch((errors) => 
        (this.updateFail())
          (console.log(errors))
         );
    },
       updateSuccess(){
      this.fetchCountry(),
      this.Edit_form = false,
      this.success = "Successfully created",
       this.failure = ""
    },
    updateFail(){ 
         this.failure = "Updated Fail"
       },

    

      // Delete Country
    deleteCountry(){
      axios.delete(`${BaseURL}/admin/payment-methods/` + this.country_iso,{
                _method: 'DELETE'
                }).then((response) =>
                (router.push({ path: `/provider-configuration` }))
                (this.hideViewDeleteModal())
                (console.log(response.data))
                )
                .catch((errors) =>
                (this.delete_fail = "Delete failed. Something went wrong, try again.")
        (this.hideViewDeleteModal())
        (console.log(errors)))
    },

    // Route history
    hasHistory () { 
        return window.history.length > 2 
        },

         // Modal
    hideModal() {
      this.open = false;
    },
    hideViewDeleteModal(){
        this.open =false;
    },

     // Collect the data
    getCountryData(){
       this.view.Country_name=this.country.name,
         this.view.Id=this.country.id,
        this.view.Airtime_api=this.country.airtime_api,
        this.view.Country_code=this.country.country_code,
        this.view.Currency_code=this.country.currency_code,
        this.view.Currency_name=this.country.currency_name,
        this.view.Currency_symbol=this.country.currency_symbol,
        this.view.Dial_code=this.country.dial_code,
        this.view.Electricity_api=this.country.electricity_api,
        this.view.Flag=this.country.flag,
        this.view.Payment_api_id=this.country.payment_api_id
    }

  
}
}
</script>
<style scoped>
h5:hover{
  border: 1px solid blue;
  transition: 1s;
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
</style>
