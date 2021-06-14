<template>
  <div class="content">
    <div class="row">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 id="heading" class="text-dark">Payments configuration</h3>
          <div class="input-group-prepend">
            <select
            v-model="Selected_search_type" 
              class="form-control shadow"
              style="background-color: white; border: 0px"
              id="sel1"
              name="sellist1"
              placeholder="Filter search"
            >
              <option value="name">Payment method name</option>
              <option value="display_name">Display name</option>
              <option value="auth_token">Auth token</option>
              <option value="text_description">Description</option>
            </select>
          </div>
          <input
          v-model="search"
            type="text"
            class="form-control shadow ml-2"
            placeholder="Search"
            style="background-color: white; border-radius: 15px; border: 0px"
          />
        </div>
      </div>
      <br />
      <div class="col-12">
        <div
          class="table-responsive text-left shadow"
          style="
            background-color: white;
            padding: 15px;
            border-radius: 15px;
            overflow-x: scroll;
          "
        >

                <h5
  class="float-left shadow"
  id="csv"
   style="
   cursor:pointer;
  border-radius:15px;
  margin-right:5px;
  color:white;
  width:100px;
  background-color:grey;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-paper"></i> CSV</h5>
   <h5
  class="float-left shadow"
  id="pdf"
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

          <table class="table">
            <thead>
              <tr style="border-bottom: 2px solid blue">
                <th>Name</th>
                <th>Display Name</th>
                <th>Auth Token</th>
                <th>Time Limit</th>
                <th>service ID</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Update At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="Data in filteredPaymentMethods" :key="Data.Id">
                <td>{{ Data.name }}</td>
                <td>{{ Data.display_name }}</td>
                <td>{{ Data.auth_token }}</td>
                <td>{{ Data.payment_time_limit }}</td>
                <td>{{ Data.service_id }}</td>
                <td>{{ Data.text_description }}</td>
                <td>{{ Data.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
                <td>{{ Data.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</td>
                <td>
                  <div class="btn-group-sm">
                    <router-link
                      :to="'payment-configuration/view-payment/' + Data.Id"
                      >VIEW</router-link
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="payment_methods == ''" class="no-data-providers">
            <span id="no-data-icon">
              <i class="tim-icons icon-alert-circle-exc"></i
            ></span>
            <h1>No Avaliable Providers</h1>
          </div>
          <h5
            class="float-left"
            style="
              border-radius: 15px;
              color: blue;
              width: 100px;
              background-color: lightblue;
              height: 30px;
              padding-top: 6px;
              text-align: center;
            "
          >
            <i class="tim-icons icon-refresh-01"></i> Reload
          </h5>

          <ul class="pagination pagination-sm float-right">
            <li class="page-item">
              <a class="page-link" href="#"
                ><i class="tim-icons icon-minimal-left"></i>
              </a>
            </li>
            <li class="page-item text-primary">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"
                ><i class="tim-icons icon-minimal-right"></i
              ></a>
            </li>
          </ul>
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
              Create Payment Method
            </div>

                <div
             v-if="failure != ''"
             class="alert alert-warning" 
             role="alert">
  {{failure}}
</div>

   <div
             v-if="success != ''"
             class="alert alert-success" 
             role="alert">
  {{success}}
</div>

          </div>
          <form>
            <div class="form-row mb-2">
              <div class="col">
                <label>Payment Method Name</label>
                <input
               v-model="form.Payment_method_name"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
              <div class="col">
                <label>Display Name</label>
                 <input
               v-model="form.Display_name"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
            </div>
            <div class="form-group mb-2">
              <label>Auth Token</label>
              <input
               v-model="form.Auth_token"
                type="text"
                class="form-control"
                id="provider-key"
                required
              />
            </div>
             <div class="form-row mb-2">
              <div class="col">
                <label>Time Limit</label>
                <input
               v-model="form.Time_limit"
                  type="number"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
              <div class="col">
                <label>Service ID</label>
                 <input
                v-model="form.Service_id"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
            </div>
            <div class="form-group mb-2">
              <label>Description</label>
              <input
               v-model="form.Description"
                type="text"
                class="form-control"
                id="provider-key"
                required
              />
            </div>
             <div class="form-row mb-2">
              <div class="col">
                <label>Payment URL</label>
                <input
               v-model="form.Payment_url"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
              <div class="col">
                <label>End Point URL</label>
                 <input
                v-model="form.End_point_url"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
            </div>
          </form>

          <div
            @click.prevent="createPaymentMethod()"
            class="float-right shadow"
            id="create-button"
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
            CREATE PAYMENT METHOD
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BaseURL } from "../helpers/http-common.js";

export default {
  components: {},
  data() {
    return {
      form:{
        Payment_method_name:'',
        Display_name:'',
        Auth_token:'',
        Time_limit:'',
        Service_id:'',
        Description:'',
        Payment_url:'',
        End_point_url:''
      },
      payment_methods: [],

        //   Selected search type
    Selected_search_type:'name',
    search:'',

          // Alerts
      success: "",
      failure: "",
    };
  },
  created() {
    this.fetchPaymentMethods();
  }, 
  computed:{
      // Filter method
     filteredPaymentMethods() {
       var q = this.Selected_search_type;
       var p = this.payment_methods.filter(Data =>
        Data[q].toLowerCase().includes(this.search.toLowerCase())
      );
      return p
    }
  },
  methods: {
    //   Get all Payments
    fetchPaymentMethods() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/admin/payment-methods`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          //
          (this.payment_methods = response.data.payment_methods)
          (console.log(response))
          (
            (this.fetch_loader = false)
          )
        )
        .catch((this.fetch_loader = false));
    },
    // Post Method for Payment creation
    createPaymentMethod(){
      let token = localStorage.getItem("token");

      axios
        .post(`${BaseURL}/admin/payment-methods`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
         name: this.form.Payment_method_name,
        display_name:this.form.Display_name,
        auth_token:this.form.Auth_token,
        payment_time_limit:this.form.Time_limit,
        service_id:this.form.Service_id,
        text_description:this.form.Description,
        payment_url:this.form.Payment_url,
       end_point_url:this.form.End_point_url
        })
        .then((response) =>
          console.log(response.data)
          (this.clearForm())
          (this.fetchPaymentMethods())(
            (this.success = "Successfully created")
          )((this.failure = ""))
        )
        .catch((errors) =>
          (this.failure = "Something went wrong, try again.")
          (this.success = "")
        );
    },
      clearForm() {
      (this.form.Provider_name = ""),
        (this.form.Service_id = ""),
        (this.form.Client_id = ""),
        (this.form.Client_secret = ""),
        (this.form.Provider_key = "");
    },
  },
};
</script>
<style scoped>
h5:hover{
  border: 1px solid blue;
  transition: 1s;
  }
#create-button:hover{
    border: 1px solid blue;
  transition: 1s;
}
.loader {
  margin-left: 44%;
  margin-bottom: 20px;
}
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
  border-bottom: 2px solid rgba(100, 100, 255, 0.767);
}
#search {
  width: 50%;
  border-radius: 50%;
}
ul {
  background-color: lightblue;
  color: blue;
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
