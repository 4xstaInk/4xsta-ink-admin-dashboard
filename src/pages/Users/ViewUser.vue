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
          >Users / <small>{{user.username}}</small></h3>
      
    </div>
        </div>
        <br/>
      <div class="col-12">
          <div class="table-responsive text-left shadow" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;">
             <table class="table">
   
    <tbody>
      <tr>
        <td>Firstname</td>
        <td>
          <span v-if="Edit_form == false">{{user.first_name}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.First_name"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Lastname</td>
        <td>
          <span v-if="Edit_form == false">{{user.last_name}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Last_name"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Username</td>
        <td>
          <span v-if="Edit_form == false">{{user.username}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Username"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Email adress</td>
        <td>
          <span v-if="Edit_form == false">{{user.email}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Email"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Role</td>
        <td>
          <span v-if="Edit_form == false">{{user.role}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Role"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>
          <span v-if="Edit_form == false">{{user.phone_number}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Phone_number"
                  type="tel"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Status</td>
        <td>
          <span v-if="Edit_form == false">{{user.status}}</span>
            <input
                v-if="Edit_form == true"
                v-model="view.Status"
                  type="text"
                  class="form-control"
                  required
                />
        </td>
      </tr>
      <tr v-if="Edit_form == false">
        <td>Created At</td>
        <td>{{user.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td></tr>
      <tr v-if="Edit_form == false">
        <td>Updated At</td>
        <td>{{user.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
        </td>
      </tr>
    </tbody> 
  </table>
 


  <router-link to="users">
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
 @click="
 Edit_form = false;
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
   @click="getUserData();
   Edit_form = true
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
   <!-- <h5
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
  text-align:center;"><i class="tim-icons icon-paper"></i> PDF</h5> -->

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
   @click="updateUser()"
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
      <h3 class="text-dark">Please confirm {{user.username}}, user deletion?</h3>
      <h5 class="text-dark">Note that this is not the usual yada-yada</h5>
      <hr/>
      <div class="btn-group btn-group-sm shadow">
  <button type="button" class="btn btn-light mr-2" @click="hideViewDeleteModal()"><i class="tim-icons icon-simple-remove"></i> No</button>
  <button type="button" class="btn btn-light" @click="deleteUser()"><i class="tim-icons icon-check-2"></i> Yes</button>
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
      user:[],
      User_id: this.$route.params.id,
      view:{
        First_name:'',
        Last_name:'',
        Username:'',
        Email:'',
        Role:'',
        Phone_number:'',
        Status:''
      },

   //  Messages
      success: "",
      failure: "",

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
    this.fetchUser();
  },
  methods:{
   //   Get User
    fetchUser(){
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/user/`+this.User_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.user = response.data.data)
          (this.fetch_loader = false)
        ).catch(
            (this.fetch_loader = false)
        );
    },

    // Update Provider
    updateUser(){
        let token = localStorage.getItem("token");

      axios.put(`${BaseURL}/countries/` + this.User_id, {
            headers: {
                Authorization: `Bearer ${token}`, 
              },          
          _method: "PUT",
         first_name:this.view.First_name,
         last_name:this.view.Last_name,
        username:this.view.Username,
        email:this.view.Email,
        role:this.view.Role,
        phone_number:this.view.Phone_number,
        status:this.view.Status
        })
        .then((response) => 
        (console.log(response.data))
            (this.updateSuccess())
            (console.log(response))
        )
        .catch((errors) =>
          (this.updateFail())
          (console.log(errors))
         );
    },
     updateSuccess(){
      this.fetchProvider(),
      this.Edit_form = false,
      this.success = "Successfully created",
       this.failure = ""
    },
    updateFail(){ 
         this.failure = "Updated Fail"
       },
      // Delete user
    deleteUser(){
      let token = localStorage.getItem("token");
      axios.delete(`${BaseURL}/user/` + this.User_id,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
                _method: 'DELETE'
                }).then((response) =>
                (router.push({ path: `/users` }))
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

    getUserData(){
       this.view.First_name=this.user.first_name,
         this.view.Last_name=this.user.last_name,
        this.view.Username=this.user.username,
        this.view.Email=this.user.email,
        this.view.Role=this.user.role,
        this.view.Phone_number=this.user.phone_number,
        this.view.Status=this.user.status
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