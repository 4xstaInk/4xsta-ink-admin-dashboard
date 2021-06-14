<template>
  <transition name="fade" mode="out-in">
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
          >Payment Method configuration / <small>{{payment_method.data.name}}</small></h3>
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
        <td>Payment Method Name</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.name}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Payment_method_name"
                  type="text"
                  class="form-control"
                  required
                />
                </td>
      </tr>
      <tr>
        <td>Display Name</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.display_name}}</span>
            <input
                 v-if="Edit_form == true"
                 v-model="view.Display_name"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Auth Token</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.auth_token}}</span>
            <input
                 v-if="Edit_form == true"
                 v-model="view.Auth_token"
                  type="text"
                  class="form-control"
                  required
                />
        </td>

      </tr>
      <tr>
        <td>Time Limit</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.payment_time_limit}}</span>
            <input
                  v-if="Edit_form == true"
                  v-model="view.Payment_time_limit"
                  type="number"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Service ID</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.service_id}}</span>
            <input
                  v-if="Edit_form == true"
                  v-model="view.Service_id"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Description</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.text_description}}</span>
            <input
                  v-if="Edit_form == true"
                  v-model="view.Description"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Payment URL</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.payment_url}}</span>
            <input
                  v-if="Edit_form == true"
                  v-model="view.Payment_url"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>End Point URL</td>
        <td><span v-if="Edit_form == false">{{payment_method.data.end_point_url}}</span>
            <input
                  v-if="Edit_form == true"
                  v-model="view.End_point_url"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
       <tr v-if="Edit_form == false">
        <td>Created At</td>
        <td>{{payment_method.data.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
        </td>
      </tr>
       <tr v-if="Edit_form == false">
        <td>Updated At</td>
        <td>{{payment_method.data.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
      </tr>
    </tbody> 
  </table>

  <router-link to="provider-configuration">
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
@click="Edit_form = false;success = '';failure = '';"
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
   @click="getProviderData();
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
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> Edit</h5>
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
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> PDF</h5>

   <h5
   @click="open = true"
   v-if="Edit_form == false"
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:5px;
  color:blue;
  width:100px;
  background-color:yellow;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> DELETE</h5>

  <h5
   v-if="Edit_form == true"
   @click="updatePaymentMethod()"
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
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> UPDATE</h5>
          </div>
          
      </div> 

    </div>

    <!-- Modal -->
    <vue-modaltor :visible="open" @hideModal="hideModal" :default-width="'30%'">
           <template #body>
        <div class="text-center">
      <h3 class="text-dark">Please confirm {{payment_method.data.name}} payment method deletion?</h3>
      <h5 class="text-dark">Note that this is not the usual yada-yada</h5>
      <hr/>
      <div class="btn-group btn-group-sm shadow">
  <button type="button" class="btn btn-light mr-2" @click="hideViewDeleteModal()">No</button>
  <button type="button" class="btn btn-light" @click="deletePaymentMethod()">Yes</button>
</div>
    </div><br/>
      </template>
    </vue-modaltor> 
  </div>
</transition>

</template>
<script>
import axios from "axios";
import {BaseURL} from "../../helpers/http-common.js";

export default{
  components:{
  
  },
  data() {
    return {
      payment_method:[], 
      payment_method_id: this.$route.params.id,

      view:{
        Payment_method_name:'',
        Display_name:'',
        Auth_token:'',
        Payment_time_limit:'',
        Service_id:'',
        Description:'',
        Payment_url:'',
        End_point_url:'',
      },
     
    //  Messages
    success:'',
    failure:'',

     delete_fail:"",

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
    this.fetchPayment();
  },
  methods:{
      //   Get  Provider
    fetchPayment() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/admin/payment-methods/`+this.payment_method_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.payment_method = response.data)
          // this.providers=response.data
        ).catch(
            (this.fetch_loader = false)
        );
    },
    
    // Update Provider
    updatePaymentMethod(){
        let token = localStorage.getItem("token");

      axios.put(`${BaseURL}/admin/payment-methods/` + this.payment_method_id, {
            headers: {
                Authorization: `Bearer ${token}`,
              },          
          _method: "PUT",
          name: this.view.Payment_method_name,
          display_name: this.view.Display_name,
          auth_token: this.view.Auth_token,
          payment_time_limit: this.view.Payment_time_limit,
          service_id: this.view.Service_id,
          text_description: this.view.Description,
          payment_url: this.view.Payment_url,
          end_point_url: this.view.End_point_url
        })
        .then((response) => 
        (this.updateSuccess())
        (console.log(response.data))
        )
        .catch(errors => 
        (this.updateFail())
        (console.log(errors))
         );
    },
        updateSuccess(){
      this.fetchPayment(),
      this.Edit_form = false,
      this.success = "Successfully created",
       this.failure = ""
    },
     updateFail(){
          this.failure = "Updated Fail"
       },
      // Delete Payment
    deletePaymentMethod(){
      axios.delete(`${BaseURL}/admin/payment-methods/` + this.payment_method_id,{
                _method: 'DELETE'
                }).then(response =>
                (router.push({ path: `/payment-configuration` }))
                (this.hideViewDeleteModal())
                (console.log(response.data))
                )
                .catch(errors =>
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
    getProviderData(){
       this.view.Payment_method_name=this.payment_method.data.name,
         this.view.Display_name=this.payment_method.data.display_name,
        this.view.Auth_token=this.payment_method.data.auth_token,
        this.view.Payment_time_limit=this.payment_method.data.payment_time_limit,
        this.view.Service_id=this.payment_method.data.service_id,
        this.view.Description=this.payment_method.data.text_description,
        this.view.Payment_url=this.payment_method.data.payment_url,
        this.view.End_point_url=this.payment_method.data.end_point_url
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
  border-bottom: 2px solid rgba(100, 100, 255, 0.767);
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
