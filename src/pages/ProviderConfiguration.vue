<template>
  <div class="content">
    <div class="row">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 id="heading" class="text-dark">Provider Configuration</h3>
          <div class="input-group-prepend">
            <select
              v-model="Selected_search_type"
              class="form-control shadow"
              style="background-color: white; border: 0px"
              id="Selected_search_type"
              name="Selected_search_type"
              placeholder="Filter search"
            >
              <option value="api_key">Provider Key</option>
              <option value="client_id">Client ID</option>
              <option value="client_secret">Client secret</option>
            </select>
          </div>
          <input
            type="text"
            class="form-control shadow ml-2"
            style="background-color: white; border-radius: 15px; border: 0px"
            v-model="search"
            placeholder="Search..."
            name="text"
            v-on:input="filteredProviders()"
            required
          />
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
          @click="exportProvidersPdf()"
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
  name="providers"
  :list="filteredProviders"
  :per="Number(number_of_rolls)"
  :key="search"
>
          <table class="table">
            <thead style="overflow: scroll">
              <tr style="border-bottom: 2px solid blue">
                <th>Provider Name</th>
                <th>Provider Key</th>
                <th>Service ID</th>
                <th>Client ID</th>
                <th>Client Secret</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="Data in paginated('providers')"
                :key="Data.id"
                style="cursor: pointer; overflow: scroll"
              >
                <td>{{ Data.name }}</td>
                <td>{{ Data.api_key }}</td>
                <td>{{ Data.service_id }}</td>
                <td>{{ Data.client_id }}</td>
                <td>{{ Data.client_secret }}</td>
                <td>
                  {{
                    Data.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                  }}
                </td>
                <td>
                  {{
                    Data.updated_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                  }}
                </td>
                <td style="color: black">
                  <div class="btn-group-sm text-dark">
                    <router-link
                      :to="'provider-configuration/view-provider/' + Data.id"
                      ><i class="tim-icons icon-tap-02"></i> VIEW</router-link
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
          for="providers" 
          :show-step-links="true"
          :limit="3"
          :container-class="'pagination'"
          class="pagination"
          :hide-prev-next="true"

  ></paginate-links>
  </div>
          <div class="loader" v-if="fetch_loader">
            <Loader />
          </div>
          <div v-if="providers == ''" class="no-data-providers">
            <span id="no-data-icon">
              <i class="tim-icons icon-alert-circle-exc"></i
            ></span>
            <h1>No Avaliable Providers</h1>
          </div>
          <h5 
            @click="fetchProviders()"
            class="float-left"
            style="
              cursor: pointer;
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
              Create Provider
            </div>

            <div v-if="failure != ''" class="alert alert-warning" role="alert">
              {{ failure }}
            </div>

            <div v-if="success != ''" class="alert alert-success" role="alert">
              {{ success }}
            </div>
          </div>
          <form>
            <div class="form-row mb-2">
              <div class="col">
                <label>Provider Name</label>
                <input
                  v-model="form.Provider_name"
                  type="text"
                  class="form-control"
                  id="provider-name"
                  placeholder="Enter Provider Name"
                  name="text"
                  required
                />
              </div>
              <div class="col">
                <label>Service ID</label>
                <select
                  v-model="form.Service_id"
                  class="form-control"
                  id="service-id"
                  name="service-id"
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
              </div>
            </div>
            <div class="form-row mb-2">
              <div class="col">
                <label>Client ID</label>
                <input
                  v-model="form.Client_id"
                  type="text"
                  class="form-control"
                  id="client-id"
                  placeholder="Enter Client ID"
                  name="client-id"
                  required
                />
              </div>
              <div class="col">
                <label>Client Secret</label>
                <input
                  v-model="form.Client_secret"
                  type="text"
                  class="form-control"
                  id="client-secret"
                  placeholder="Enter Client Secret"
                  name="clent-secret"
                  required
                />
              </div>
            </div>
            <div class="form-group mb-2">
              <label>Provider Key</label>
              <input
                v-model="form.Provider_key"
                type="text"
                class="form-control"
                id="provider-key"
                required
              />
            </div>
          </form>

          <div
            @click="createProvider()"
            class="float-right shadow"
            id="create-button"
            style="
              cursor: pointer;
              border-radius: 15px;
              color: blue;
              background-color: lightblue;
              height: 30px;
              width: 400px;
              padding-top: 6px;
              text-align: center;
            "
          >
            <i class="tim-icons icon-simple-add"></i> CREATE PROVIDER
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseURL } from "../helpers/http-common.js";
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Loader from "../Loaders/loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      form: {
        Provider_name: "",
        Service_id: "",
        Client_id: "",
        Client_secret: "",
        Provider_key: "",
      },
      // Fetched Providers
      providers: [],

      // Paginate Providers
      paginate: ['providers'],

      // Alerts
      success: "",
      failure: "",

      // Service Data
      Service_data: [],
      services: [],

      // ViewForm Data
      showForm: "",
 
      //   Selected search type
      Selected_search_type: "api_key",

      search: "",

      //   Loaders
      fetch_loader: true,

      //   Modal
      open: false,

    // Number of rolls
     number_of_rolls:'2'
    };
  },
  created() {
    this.fetchProviders();
    this.fetchService();
  },
  computed: {
    // Filter method
    filteredProviders() {
      var q = this.Selected_search_type;
      var p = this.providers.filter((Data) =>
        Data[q].toLowerCase().includes(this.search.toLowerCase())
      );
      return p;
    }, 
  },
  methods: {
    //   Get all Providers
    fetchProviders() {
      let token = localStorage.getItem("token");
      this.fetch_loader = true;
      console.log('Refresh');
      axios
        .get(`${BaseURL}/providers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) =>
          (this.providers = response.data.data.apis)(
            (this.fetch_loader = false)
          )
        )
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
    // Post Method for Provider creation
    createProvider() {
      let token = localStorage.getItem("token");

      axios
        .post(`${BaseURL}/provider`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          name: this.form.Provider_name,
          service_id: this.form.Service_id,
          client_id: this.form.Client_id,
          client_secret: this.form.Client_secret,
          api_key: this.form.Provider_key,
        })
        .then((response) =>
          console.log(response.data)(this.clearForm())(this.fetchProviders())(
            (this.success = "Successfully created")
          )((this.failure = ""))
        )
        .catch((errors) =>
          (this.failure = "Something went wrong, try again.")(
            (this.success = "")
          )
        );
    },
    clearForm() {
      (this.form.Provider_name = ""),
        (this.form.Service_id = ""),
        (this.form.Client_id = ""),
        (this.form.Client_secret = ""),
        (this.form.Provider_key = "");
    },

    // Modal
    hideModal() {
      this.open = false;
    },
    
    // CSV methods
    downloadCSV: function(){
     
      if (this.providers == null) {
          console.log('Download CSV error'+this.providers)
      }else{
      let csv = '\ufeff' + 'Provider Name,Provider Key,service ID,Client ID,Client Secret,Created At,Updated At\n'
      this.providers.forEach(el => {
        var line = el['name'] + ',' + el['api_key'] + ',' + el['service_id'] + ',' + el['client_id'] + ',' + el['client_secret'] + ',' + el['created_at'] + ',' + el['updated_at'] + '\n'
        csv += line
      })
      var blob = new Blob([ csv ], { "type" : "csv/plain" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Providers.csv'
      link.click()
      }
    },

    // Export PDF method
     exportProvidersPdf(){
      var vm = this
      
      var columns = [
        {title: "Provider Name", dataKey: "name"},
        {title: "Provider Key", dataKey: "api_key"},
        {title: "Service ID", dataKey: "service_id"},
        {title: "Client ID", dataKey: "client_id"},
        {title: "Client Secret", dataKey: "client_secret"},
        {title: "Created at", dataKey: "created_at"},
        {title: "Updated At", dataKey: "updated_at"}
        ];
      var doc = new jsPDF('p', 'pt');
      doc.text('Provider Methods',30,20)
      doc.autoTable(columns, vm.providers);
      doc.save('Provider_Methods.pdf');
    },

  },
};
</script>
<style scoped>
h5:hover {
  border: 1px solid blue;
  transition: 1s;
}
table{
    overflow-x:scroll;
}
#create-button:hover {
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

#heading {
  margin-right: 10%;
  border-bottom: 2px solid rgba(100, 100, 255, 0.767);
}
tr:hover {
  background-color: #f2f2f2;
}
#search {
  width: 50%;
  border-radius: 50%;
}
/* ul {
  background-color: lightblue;
  color: blue;
} */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
