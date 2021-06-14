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
        <select class="form-control shadow" 
        style="background-color:white;border:0px;"
        id="sel1" name="sellist1" placeholder="Filter search">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      </div>
      <input type="text" class="form-control shadow ml-2" placeholder="Search" style="background-color:white;border-radius:15px;border:0px;">
    </div>
        </div>
        <br/>
      <div class="col-12">
          <div class="table-responsive text-left" style="background-color:white;padding:15px;border-radius:15px;overflow:hidden;">
             <table class="table">
    <thead>
      <tr style="border-bottom:2px solid blue">
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
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

  <ul class="pagination pagination-sm float-right">
    <li class="page-item"><a class="page-link" href="#"><i class="tim-icons icon-minimal-left"></i> </a></li>
    <li class="page-item text-primary"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#"><i class="tim-icons icon-minimal-right"></i></a></li>
  </ul>
          </div>
          
      </div>

    </div>
  </div>
</template>
<script>


export default{
  components:{
  
  },
  data() {
    return {
     
    };
  }
}
</script>
<style scoped>
#heading{
  margin-right:50%;
  border-bottom:5px solid rgba(100, 100, 255, 0.767);
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
