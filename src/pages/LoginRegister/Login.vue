<template>
  <div class="height:100%">
    <div class="body">
        <div class="holder">
  <img src="../../assets/img/Pareza-Group.png" alt="Logo">
  
    <div class="form-group">
      <label for="email">Email:</label>
      <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" name="email">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input v-model="password" type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd">
    </div>
    <div  @click="handleLogin()" id="btn">Submit</div>

</div>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {},
  created() {
   
  },
  methods: {
    handleLogin() {
      console.log("t");
      axios
        .post("https://api.paybill.dazwallet.com/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          (localStorage.setItem("token", response.data.data.access_token)),
          
            (this.pushToDashboard())
        }).catch
           (this.pushToDashboard()); 
    }, 
    pushToDashboard(){
      this.$router.push("/");
    }
  },
}; 
</script>

<style scoped>
.body{
  height: 100vh;
  background-image: url("../../assets/img/loginBgBlue.png"); 
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;   
}
/* Add styles to the form container */
.holder {
  color:white;
  position: absolute;
  right:5%;
  top:30%;
  max-width: 30%;
  width:100%;
  padding: 16px;
  background-color:rgba(160, 198, 255, 0.651);
  border-radius: 15px;
  
}


input[type=text]:focus, input[type=password]:focus {
  outline: none;
  color: white;
}

/* Set a style for the submit button */
#btn {
  background-color: #0289b3;
  color: white;
  padding: 16px 20px;
  border: none;
  border-radius:15px;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

#btn:hover {
  opacity: 1;
}
.label{
    color:black;
}
img{
  height:100px;
  margin-bottom: 3;
  }

</style>