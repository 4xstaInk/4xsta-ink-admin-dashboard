<template>
  <div class="content">
    <div class="row">
      <div class="col-12 mb-1">
        <div class="input-group mb-1">
          <h3 
          id="heading"
          class="text-dark"
          >Transactions</h3>
      <div class="input-group-prepend">
        <select
        v-model="Selected_search_type"
        class="form-control shadow" 
        style="background-color:white;border:0px;"
        id="sel1"
         name="sellist1" 
         placeholder="Filter search">
        <option value="txnId">Txn ID</option>
        <option  value="account">Account</option>
        <option value="amount">Amount</option>
        <option value="channel">Channel</option>
        <option value="disbursement_status">Disbursement Status</option>
        <option value="countryIso">Country ISO</option>
        <option value="disbursement_status">Disbursement Status</option>
        <option value="externalID">External ID</option>
        <option value="operatorCode">Operator Code</option>
        <option value="providerApiId">Provider Api</option>
        <option value="payment_method">Payment Method</option>
        <option value="payment_status">Payment Status</option>
        <option value="status">Status</option>
        <option value="serviceID">Service ID</option>
        <option value="userId">User ID</option>
        <option value="created_at">Date Created</option> 
      </select>
      </div>
      <input type="text" v-model="search" class="form-control shadow ml-2" placeholder="Search" style="background-color:white;border-radius:15px;border:0px;">
    </div>
        </div>
      <div class="col-12">
          <div class="table-responsive text-left shadow" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;overflow:auto;">

            
   <h5
   @click="downloadCSV()"
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
   @click="exportTransactionsPdf()"
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
      <tr 
      style="border-bottom:2px solid blue">
        <th>Txn ID</th>
         <th>Amount</th>
         <th>Provider API</th>
         <th>External ID</th>
         <th>Status</th>
         <th>Service ID</th>
         <th>Operator Code</th>
         <th>Account</th>
         <th>Country ISO</th>
         <th>Channel</th>
         <th>Disbursement Status</th>
         <th>Payment Method</th>
         <th>Payment Status</th>
         <th>User ID</th>
         <th>Date</th>   
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="Data in filteredTransactions"
      :key="Data.id"
      style="cursor:pointer"
      @click="viewOneTransaction(Data);open = true"
      >
        <td>{{ Data.txnId }}</td>
        <td>{{ Data.amount }}</td>
        <td>{{ Data.providerApiId }}</td>
        <td>{{ Data.externalId }}</td>
        <td>{{ Data.status }}</td>
        <td>{{ Data.serviceID }}</td>
        <td>{{ Data.operatorCode }}</td>
        <td>{{ Data.account }}</td>
        <td>{{ Data.countryIso }}</td>
        <td>{{ Data.channel }}</td>
        <td>{{ Data.disbursement_status }}</td>
        <td>{{ Data.payment_method }}</td>
        <td>{{ Data.payment_status }}</td>
        <td>{{ Data.userId }}</td>
        <td>{{ Data.created_at | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>
      </tr>
    </tbody>
  </table> 
 <div v-if="transactions == ''" class="no-data-providers">
            <span id="no-data-icon">
              <i class="tim-icons icon-alert-circle-exc"></i
            ></span>
            <h1>No Avaliable Providers</h1>
          </div>

   <h5
  class="float-left"
   style="
   cursor:pointer;
  border-radius:15px;
  color:blue;
  width:100px;
  background-color:lightblue;
  height:30px;
  padding-top:6px;
  text-align:center;"><i class="tim-icons icon-refresh-01"></i> Reload</h5>

  <ul class="pagination pagination-sm float-right text-dark">
    <li class="page-item"><a class="page-link" href="#"><i class="tim-icons icon-minimal-left"></i> </a></li>
    <li class="page-item text-primary"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#"><i class="tim-icons icon-minimal-right"></i></a></li>
  </ul>
          </div>
          
      </div>
 <!-- Modal -->
    <vue-modaltor :visible="open" @hideModal="hideModal" :default-width="'90%'">
           <template #body>
        <div class="text-center">
       <table class="table">
        <thead>
      <tr 
      style="border-bottom:2px solid blue">
        <th>Txn ID</th>
         <th>Amount</th>
         <th>Provider API</th>
         <th>External ID</th>
         <th>Status</th>
         <th>Service ID</th>
         <th>Operator Code</th>
         <th>Account</th>
         <th>Country ISO</th>
         <th>Channel</th>
         <th>Disbursement Status</th>
         <th>Payment Method</th>
         <th>Payment Status</th>
         <th>User ID</th>
         <th>Date</th>   
      </tr>
    </thead>
        <tbody>
          <tr>
         <td>{{ view.TxnId }}</td>
        <td>{{ view.Amount }}</td>
        <td>{{ view.ProviderApi }}</td>
        <td>{{ view.ExternalId }}</td>
        <td>{{ view.Status }}</td>
        <td>{{ view.ServiceID }}</td>
        <td>{{ view.OperatorCode }}</td>
        <td>{{ view.Account }}</td>
        <td>{{ view.CountryIso }}</td>
        <td>{{ view.Channel }}</td>
        <td>{{ view.Disbursement_status }}</td>
        <td>{{ view.Payment_method }}</td>
        <td>{{ view.Payment_status }}</td>
        <td>{{ view.UserId }}</td>
        <td>{{ view.CreatedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</td>  
        </tr>
        </tbody>
      </table>
    </div><br/>
      </template>
    </vue-modaltor>
    </div>
  </div>
</template>
<script>
import {BaseURL} from "../helpers/http-common.js";
import axios from "axios";


import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default{
  components:{
  
  },
  data() {
    return {
        view:{
          TxnId:"",
          Amount:"",
          ProviderApi:"",
          ExternalApiID:"",
          CreatedAt:"",
          Status:"",
          ServiceId:"",
          OperatorCode:"",
          Account:"",
          CountryIso:"",
          Channel:"",
          Disbursement_status:"",
          Payment_method:"",
          Payment_status:"",
          UserId:""
      },
      transactions:[],
    
     // Selected_search_type disbursement_status
      Selected_search_type:"txnId",
      search: "",

      // Date data
      date:"",

    //   Modal
    open: false,
      
    };
  },
  created(){
   this.fetchTransaction();
  },
  computed:{
      // Filter method
     filteredTransactions() {
       var q = this.Selected_search_type;
       var p = this.transactions.filter(Data =>
        Data[q].toLowerCase().includes(this.search.toLowerCase())
      );
      return p
    }
  },
  methods:{ 
      fetchTransaction(){
        let token = localStorage.getItem("token");
          axios.get(`${BaseURL}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        ).then(
            response =>{
               (this.transactions = response.data.data.transactions)
                (console.log(response.data.data.transactions))
            }
        );
      },
      viewOneTransaction(Data){
        this.view.TxnId=Data.txnId,
          this.view.Amount=Data.amount,
          this.view.ProviderApi=Data.providerApiId, 
          this.view.ExternalApiID=Data.externalId,
          this.view.CreatedAt=Data.created_at,
          this.view.Status=Data.status,
          this.view.ServiceId=Data.serviceID,
          this.view.OperatorCode=Data.operatorCode,
          this.view.Account=Data.account,
          this.view.CountryIso=Data.countryIso ,
          this.view.Channel=Data.channel,
          this.view.Disbursement_status=Data.disbursement_status,
          this.view.Payment_method=Data.payment_method,
          this.view.Payment_status=Data.payment_status ,
          this.view.UserId=Data.userId
      },
          // Modal
    hideModal() {
      this.open = false;
    },

    // CSV methods
    downloadCSV: function(){
     
      if (this.transactions == null) {
          console.log('Download CSV error'+this.transactions)
      }else{
      let csv = '\ufeff' + 'Txn ID,Amount,Provider Api,External Id,Status,Service Id,Operator Code,Account,Country Iso,Channel,Created At\n'
      this.transactions.forEach(el => {
        var line = el['txnId'] + ',' + el['amount'] + ',' + el['providerApiId'] + ',' + el['externalId'] + ',' + el['status'] + ',' + el['serviceID'] + ',' + el['operatorCode'] + ',' + el['account'] + ',' + el['countryIso'] + ',' + el['channel'] + ',' + el['created_at'] + '\n'
        csv += line
      })
      var blob = new Blob([ csv ], { "type" : "csv/plain" });
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'Transactions.csv'
      link.click()
      }
    },

    // Export PDF method
     exportTransactionsPdf(){
      var vm = this
    
      var columns = [
        {title: "Txn ID", dataKey: "txnId"},
        {title: "Amount", dataKey: "amount"},
        {title: "Provider ID", dataKey: "providerApiId"},
        {title: "External ID", dataKey: "externalId"},
        {title: "Status", dataKey: "status"},
        {title: "Service ID", dataKey: "serviceID"},
        {title: "Operator Code", dataKey: "operatorCode"},
        {title: "Account", dataKey: "account"},
        {title: "Country ISO", dataKey: "countryIso"},
        {title: "Channel", dataKey: "channel"},
        {title: "Created At", dataKey: "created_at"},
        ];
      var doc = new jsPDF();
      doc.text('Transactions',30,20)
      doc.autoTable(columns, vm.transactions);
      doc.save('Transactions.pdf');
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
  margin-right:20%;
  border-bottom:5px solid rgba(100, 100, 255, 0.767);
}
#search{
  width:50%;
  border-radius: 50%;
}
tr:hover{
  background-color: #f2f2f2;
}
ul{
  background-color:lightblue;
  color: blue;
}
#no-data-icon{
    font-size: 70px;
  }
  .no-data-providers {
  color: #bfbfbf;
  text-align: center;
  width: 100%;
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
