<template>
  <div class="content">
    <div class="row">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 
          id="heading"
          class="text-dark"
          >Users</h3>
      <div class="input-group-prepend">
        <select 
        v-model="Selected_search_type"
        class="form-control shadow" 
        style="background-color:white;border:0px;"
        id="sel1" name="sellist1" placeholder="Filter search">
        <option value="first_name">Firstname</option>
        <option value="last_name">Lastname</option>
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="created_at">Created</option>
        <option value="updated_at">Updated</option>
      </select>
      </div>
      <input type="text" v-model="search" class="form-control shadow ml-2" placeholder="Search" style="background-color:white;border-radius:15px;border:0px;">
    </div>
        </div>
        <br/>
      <div class="col-12">
          <div class="table-responsive text-left shadow" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;">
         <h5
            @click="downloadCSV()"
            class="float-left shadow"
            id="csv"
            style="
              cursor: pointer;
              border-radius: 15px;
              margin-right: 5px;
              color: white;
              width: 100px;
              background-color: grey;
              height: 30px;
              padding-top: 6px;
              text-align: center;
            "
          >
            <i class="tim-icons icon-paper"></i> CSV
          </h5>
          <h5
          @click="exportUsersPdf()"
            class="float-left shadow"
            id="pdf"
            style="
              cursor: pointer;
              border-radius: 15px;
              color: white;
              margin-right: 5px;
              width: 100px;
              background-color: grey;
              height: 30px;
              padding-top: 6px;
              text-align: center;
            "
          >
            <i class="tim-icons icon-paper"></i> PDF
          </h5>
          <paginate
  name="users"
  :list="filteredUsers"
  :per="Number(number_of_rolls)"
  :key="search"
>
             <table class="table">
    <thead>
      <tr style="border-bottom:2px solid blue">
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
        <th>Phone</th>
        <th>Status</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="Data in paginated('users')"
      :key="Data.user_id"
      >
        <td>{{Data.first_name}}</td>
        <td>{{Data.last_name}}</td>
        <td>{{Data.username}}</td>
        <td>{{Data.email}}</td>
        <td>{{Data.role}}</td>
        <td>{{Data.phone_number}}</td>
        <td>{{Data.status}}</td>
        <td>{{Data.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
        <td>{{Data.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
        <td>
          <div class="btn-group-sm">
                    <router-link
                      :to="'users/view-user/' + Data.user_id"
                      >VIEW</router-link
                    >
                  </div>
        </td>
      </tr>
    </tbody>
  </table>
          </paginate>
            <div class="float-right">
              <div class="form-group-sm mb-2">
      <label for="">Number of rolls: {{number_of_rolls}}</label>
      <select v-model="number_of_rolls" class="form-control" id="sel1" name="sellist1">
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option> 
      </select>
</div>
          <paginate-links 
          for="users" 
          :show-step-links="true"
          :limit="3"
          :container-class="'pagination'"
          class="pagination"
          :hide-prev-next="true"

  ></paginate-links>
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

    
    <div class="row mt-3">
      <div class="col-12">
        <div
          class="table-responsive text-left shadow"
          style="
            background-color: white;
            padding: 15px;
            border-radius: 15px;
            overflow: hidden;
          "
        >
          <div class="mb-3">
            <div class="text-dark" style="border-bottom: 2px solid lightblue">
              Create User
            </div>

             <!-- <div
             v-if="failure != ''"
             class="alert alert-warning" 
             role="alert">
  {{failure}}
</div> -->

          </div>
          <form>
            <div class="form-row mb-2">
              <div class="col">
                <label>Firstname</label>
                <input
               v-model="form.Firstname"
                  type="text"
                  class="form-control"
                  placeholder="Enter Provider Name"
                  required
                />
              </div>
              <div class="col">
                <label>Lastname</label>
                <input
         v-model="form.Lastname"
                  type="text"
                  class="form-control"
                  placeholder="Enter Provider Name"
                  required
                />
              </div>
              <div class="col">
                <label>Username <span class="text-danger" v-if="username_exist"> :username is in use, use different</span>
                <span class="text-success"
   v-if=" (username_exist != true) && (form.Username != '' )"> :Username is avaliable for use</span></label>
                <input
              v-model="form.Username"
              v-on:input="matchUsername"
                  type="text"
                  class="form-control"
                  placeholder="Enter Provider Name"
                  required
                />
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col">
                <label>Email address <span class="text-danger" v-if="email_exist"> :Email is in use, use different</span>
                <span class="text-success"
   v-if=" (email_exist != true) && (form.Email != '' )"> :Email is avaliable for use</span>
                </label>
                <input
             v-model="form.Email"
             v-on:input="matchEmail"
                  type="text"
                  class="form-control"
                  placeholder="Enter Client ID"
                  required
                />
              </div>
              <div class="col">
                <label>Phone number</label>
                <input
           v-model="form.Phone_number"
                  type="text"
                  class="form-control"
                  placeholder="Enter Client Secret"
                  required
                />
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col">
                <label>Role</label>
                <input
             v-model="form.Role"
                  type="text"
                  class="form-control"
                  placeholder="Enter Client ID"
                  required
                />
              </div>
              <div class="col">
                <label>Status</label>
                <input
           v-model="form.status"
                  type="text"
                  class="form-control"
                  placeholder="Enter Client Secret"
                  required
                />
              </div>
            </div>
          </form>
<!-- (email_exist == false) || (form.Email != '' ) || (username_exist == false) || (form.Username != '' ) -->
          <div
          v-if="form.Firstname == '' && form.Lastname == '' && form.Username == '' && form.Email == '' && form.Phone_number == '' && form.Role == '' && form.Status == ''"

            @click.prevent="createUser()" 
            class="float-right"
            style="
            cursor:pointer;
              border-radius: 15px;
              color: blue;
              background-color: lightblue;
              height: 30px;
              width: 400px;
              padding-top: 6px;
              text-align: center;
            "
          >
            CREATE PROVIDER
          </div>
           <div
            v-if=" (email_exist == true) && (username_exist == true)"
            class="float-right"
            style="
            cursor:pointer;
              border-radius: 15px;
              color: white;
              background-color: #e6e6e6;
              height: 30px;
              width: 400px;
              padding-top: 6px;
              text-align: center;
            "
          >
            CREATE PROVIDER
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {BaseURL} from "../helpers/http-common.js";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default{
  components:{
  
  },
  data() {
    return {
     form:{
       Firstname:'',
       Lastname:'',
       Username:'',
       Email:'',
       Phone_number:'',
       Role:'',
       Status:''
     },
    // Fetched Users
     users:[],

    // Paginate Providers
      paginate: ['users'],

   //   Selected search type
    Selected_search_type:'first_name',

    search:'',
   
  // Matching Data
  email_exist:'',
  username_exist:'',

   // Number of rolls
     number_of_rolls:'2'

    };
  },
     created() {
    this.fetchUsers();
  },
  computed:{


    // Filter method
     filteredUsers() {
       var q = this.Selected_search_type;
       var p = this.users.filter(Data =>
        Data[q].toLowerCase().includes(this.search.toLowerCase())
      );
      return p
    }, 
  },
  methods: {
    //   Get all Users
    fetchUsers() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.users=response.data.data.users)
          (this.fetch_loader = false)
        ).catch(
            (this.fetch_loader = false)
        );
    },
  
  // Post Method for Payment creation
    createUser(){
      let token = localStorage.getItem("token");

      axios
        .post(`${BaseURL}/admin/payment-methods`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        first_name: this.form.Firstname,
          last_name: this.form.Lastname,
          client_secret: this.form.Username,
          email: this.form.Email,
          phone_number: this.form.Phone_number,
          role: this.form.Role,
          status: this.form.Status
        })
        .then((response) =>
          console.log(response.data)
          (this.clearForm())
          (this.fetchUsers())
        )
        .catch((errors) =>
          ("Something went wrong, try again.")

        );
    },
      clearForm() {
      this.form.Firstname = '',
      this.form.Lastname = '',
      this.form.Username = '',
      this.form.Email = '',
      this.form.Phone_number = '',
      this.form.Role = '',
      this.form.Status = ''
    },

    matchEmail(){
      const arrTwo = this.users;

      const hasDraft = obj => obj.email === this.form.Email;

       this.email_exist = arrTwo.some(hasDraft);
        
        console.log(this.email_exist);
    },
    matchUsername(){
      const arrTwo = this.users;

      const hasDraft = obj => obj.username === this.form.Username;

       this.username_exist = arrTwo.some(hasDraft);
        
        console.log(this.username_exist);
    },
  // CSV methods
    downloadCSV: function(){
     
      if (this.users == null) {
          console.log('Download CSV error '+this.users)
      }else{
      let csv = '\ufeff' + 'Firstname,Lastname,Username,email,Role,Phone,Status,Created At,Updated At\n'
      this.users.forEach(el => {
        var line = el['first_name'] + ',' + el['last_name'] + ',' + el['username'] + ',' + el['email'] + ',' + el['role'] + ',' + el['phone_number'] + ',' + el['status'] + ',' + el['created_at'] + ',' + el['updated_at'] + '\n'
        csv += line
      })
      var blob = new Blob([ csv ], { "type" : "csv/plain" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Users.csv'
      link.click()
      }
    },

    // Export PDF method
     exportUsersPdf(){
      var vm = this
      
      var columns = [
        {title: "Firstname", dataKey: "first_name"},
        {title: "Lastname", dataKey: "last_name"},
        {title: "Username", dataKey: "username"},
        {title: "Email", dataKey: "email"},
        {title: "Role", dataKey: "role"},
        {title: "Phone", dataKey: "phone_number"},
        {title: "Status", dataKey: "status"},
        {title: "Created at", dataKey: "created_at"},
        {title: "Updated At", dataKey: "updated_at"}
        ];
      var doc = new jsPDF('p', 'pt');
      doc.text('Users ',30,20)
      doc.autoTable(columns, vm.users);
      doc.save('Users.pdf');
    },

}
}
</script>
<style scoped>
h5:hover{
  border: 1px solid blue;
  transition: 1s;
  }
  table{
    overflow-x:scroll;
}
#heading{
  margin-right:10%;
  border-bottom:2px solid rgba(100, 100, 255, 0.767);
}
#search{
  width:50%;
  border-radius: 50%;
}

</style>
