<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div class="row">
        <div class="col-12 mb-1">
          <div class="input-group mb-1">
            <h3
              id="heading"
              class="text-dark"
              style="cursor: pointer"
              @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            >
              Provider configuration / <small>{{ providers.data.name }}</small>
            </h3>
          </div>
        </div>

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
                  <td>Provider Name</td>
                  <td>
                    <span v-if="Edit_form == false">{{
                      providers.data.name
                    }}</span>
                    <input
                      v-if="Edit_form == true"
                      v-model="view.Provider_name"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Provider Key</td>
                  <td>
                    <span v-if="Edit_form == false">{{
                      providers.data.api_key
                    }}</span>
                    <input
                      v-if="Edit_form == true"
                      v-model="view.Provider_key"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Service ID</td>
                  <td>
                    <span v-if="Edit_form == false">{{
                      providers.data.id
                    }}</span>
                    <select
                      class="form-control"
                      id="service-id"
                      name="service-id"
                      v-if="Edit_form == true"
                      required
                    >
                      <option
                        v-for="Data in services"
                        :key="Data.id"
                        :value="Data.id"
                      >
                        {{ Data.name }} - {{ Data.id }}
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Client ID</td>
                  <td>
                    <span v-if="Edit_form == false">{{
                      providers.data.client_id
                    }}</span>
                    <input
                      v-if="Edit_form == true"
                      v-model="view.Client_id"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Client Secret</td>
                  <td>
                    <span v-if="Edit_form == false">{{
                      providers.data.client_secret
                    }}</span>
                    <input
                      v-if="Edit_form == true"
                      v-model="view.Client_secret"
                      type="text"
                      class="form-control"
                      required
                    />
                  </td>
                </tr>
                <tr v-if="Edit_form == false">
                  <td>Created At</td>
                  <td>
                    {{
                      providers.data.created_at
                        | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                    }}
                  </td>
                </tr>
                <tr v-if="Edit_form == false">
                  <td>Updated At</td>
                  <td>
                    {{
                      providers.data.updated_at
                        | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                    }}
                  </td>
                </tr>
              </tbody>
            </table>

            <router-link to="provider-configuration">
              <h5
                v-if="Edit_form == false"
                class="float-left"
                style="
                  cursor: pointer;
                  border-radius: 15px;
                  margin-right: 20px;
                  color: black;
                  width: 100px;
                  background-color: transparent;
                  height: 30px;
                  padding-top: 6px;
                  text-align: center;
                "
                @click="hasHistory() 
                        ? $router.go(-1) 
                        : $router.push('/')"
              >
                <i class="tim-icons icon-double-left"></i> Back
              </h5>
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
                cursor: pointer;
                border-radius: 15px;
                margin-right: 20px;
                color: black;
                width: 100px;
                background-color: transparent;
                height: 30px;
                padding-top: 6px;
                text-align: center;
              "
            >
              <i class="tim-icons icon-double-left"></i> Back
            </h5>

            <h5
              @click="
                getProviderData();
                Edit_form = true;
                delete_fail = '';
              "
              v-if="Edit_form == false"
              class="float-left"
              style="
                cursor: pointer;
                border-radius: 15px;
                margin-right: 5px;
                color: blue;
                width: 100px;
                background-color: lightblue;
                height: 30px;
                padding-top: 6px;
                text-align: center;
              "
            >
              <i class="tim-icons icon-pencil"></i> Edit
            </h5>
            <h5
              v-if="Edit_form == false"
              class="float-left"
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

            <h5
              @click="open = true"
              v-if="Edit_form == false"
              class="float-left"
              style="
                cursor: pointer;
                border-radius: 15px;
                margin-right: 5px;
                color: black;
                width: 100px;
                background-color: yellow;
                height: 30px;
                padding-top: 6px;
                text-align: center;
              "
            >
              <i class="tim-icons icon-trash-simple"></i> DELETE
            </h5>

            <h5
              v-if="Edit_form == true"
              @click="updateProvider()"
              class="float-left"
              style="
                cursor: pointer;
                border-radius: 15px;
                margin-right: 5px;
                color: white;
                width: 100px;
                background-color: green;
                height: 30px;
                padding-top: 6px;
                text-align: center;
              "
            >
              <i class="tim-icons icon-check-2"></i> UPDATE
            </h5>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <vue-modaltor
        :visible="open"
        @hideModal="hideModal"
        :default-width="'30%'"
      >
        <template #body>
          <div class="text-center">
            <h3 class="text-dark">
              Please confirm {{ view.Provider_name }} API deletion?
            </h3>
            <h5 class="text-dark">Note that this is not the usual yada-yada</h5>
            <hr />
            <div class="btn-group btn-group-sm shadow">
              <button
                type="button"
                class="btn btn-light mr-2"
                @click="hideViewDeleteModal()"
              >
                <i class="tim-icons icon-simple-remove"></i> No
              </button>
              <button
                type="button"
                class="btn btn-light"
                @click="deleteProvider()"
              >
                <i class="tim-icons icon-check-2"></i> Yes
              </button>
            </div>
          </div>
          <br />
        </template>
      </vue-modaltor>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import { BaseURL } from "../../helpers/http-common.js";

export default {
  components: {
  },
  data() {
    return {
      providers: [],

      Provider_id: this.$route.params.id,

      view: {
        Provider_id: "",
        Provider_name: "",
        Provider_key: "",
        Service_id: "",
        Client_id: "",
        Client_secret: "",
      },

      //  Messages
      success: "",
      failure: "",

      delete_fail:"",

      //  Edit Form data
      Edit_form: false,
      // Services
      services: "",

      //   Modal
      open: false,

      // Loader
      fetch_loader: "",
    };
  },
  created() {
    this.fetchProvider();
    this.fetchService();
  },
  methods: {
    //   Get  Provider
    fetchProvider() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      axios
        .get(`${BaseURL}/provider/` + this.Provider_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => (this.providers = response.data))
        .catch((this.fetch_loader = false));
    },

    //   Get all Services
    fetchService() {
      let token = localStorage.getItem("token");
      axios
        .get(`${BaseURL}/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.services = response.data.data.services)(console.log(response))
        )
        .catch();
    },

    // Update Provider
    updateProvider() {
      let token = localStorage.getItem("token");

      axios
        .put(`${BaseURL}/provider/` + this.Provider_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          _method: "PUT",
          name: this.view.Provider_name,
          service_id: this.view.Service_id,
          client_id: this.view.Client_id,
          client_secret: this.view.Client_secret,
          api_key: this.view.Provider_key,
        })
        .then((response) =>
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

    // Delete Provider
    deleteProvider() {
      let token = localStorage.getItem("token");
      axios
        .delete(`${BaseURL}/provider/` + this.Provider_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          _method: "DELETE",
        })
        .then((response) =>
        (router.push({ path: `/provider-configuration` }))
        (this.hideViewDeleteModal())
          (console.log(response.data))
          
        )
        .catch((errors) => 
        (this.delete_fail = "Delete failed. Something went wrong, try again.")
        (this.hideViewDeleteModal())
        (console.log(errors))
        
      
        );
    },

    // Route history
    hasHistory() {
      return window.history.length > 2;
    },

    // Modal
    hideModal() {
      this.open = false;
    },
    hideViewDeleteModal() {
      this.open = false;
    },

    // Collect the data
    getProviderData() {
      (this.view.Provider_id = this.providers.data.api_code),
        (this.view.Provider_name = this.providers.data.name),
        (this.view.Provider_key = this.providers.data.api_key),
        (this.view.Service_id = this.providers.data.id),
        (this.view.Client_id = this.providers.data.client_id),
        (this.view.Client_secret = this.providers.data.client_secret);
    },
  },
};
</script>
<style scoped>
h5:hover{
  border: 1px solid blue;
  transition: 1s;
  }
#heading {
  margin-right: 10%;
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
</style>
