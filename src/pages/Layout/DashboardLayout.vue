<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

  <!-- General -->
    <side-bar >
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <h4 class="ml-1" style="color:black"><i style="color:black;" class="tim-icons icon-chart-bar-32"></i> General</h4>
      <sidebar-link to="/dashboard">

        <template>
          <p>Dashboard</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/transactions">

        <template>
          <p>Transactions</p>
        </template>
      </sidebar-link>
<hr/>
      <!-- Configurations -->
      <h4 class="ml-1" style="color:black"><i style="color:black" class="tim-icons icon-settings-gear-63"></i> Configurations</h4>
       <sidebar-link to="/provider-configuration">

        <template>
          <p>Provider Configuration</p>
        </template>
      </sidebar-link>
       <sidebar-link to="/payment-configuration">
 
        <template>
          <p>Payment Configuration</p>
        </template>
      </sidebar-link>
       <sidebar-link to="/country-configuration">

        <template>
          <p>Country Configuration</p>
        </template>
      </sidebar-link>
<hr/>
<!-- Users -->
 <h4 class="ml-1" style="color:black"><i style="color:black" class="tim-icons icon-single-02"></i> User</h4>
      <sidebar-link to="/users">

        <template>
          <p class="text-dark">Users</p>
        </template>
      </sidebar-link>
      <!-- <sidebar-link to="/icons">
        <i class="tim-icons icon-atom"></i>
        <template v-if="!isRTL">
          <p>Icons</p>
        </template>
        <template v-else>
          <p>الرموز</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/maps">
        <i class="tim-icons icon-pin"></i>
        <template v-if="!isRTL">
          <p>Maps</p>
        </template>
        <template v-else>
          <p>خرائط</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <i class="tim-icons icon-bell-55"></i>
        <template v-if="!isRTL">
          <p>Notifications</p>
        </template>
        <template v-else>
          <p>إخطارات</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/user">
        <i class="tim-icons icon-single-02"></i>
        <template v-if="!isRTL">
          <p>User Profile</p>
        </template>
        <template v-else>
          <p>ملف تعريفي للمستخدم</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/table">
        <i class="tim-icons icon-puzzle-10"></i>
        <template v-if="!isRTL">
          <p>Table List</p>
        </template>
        <template v-else>
          <p>قائمة الجدول</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/typography">
        <i class="tim-icons icon-align-center"></i>
        <template v-if="!isRTL">
          <p>Typography</p>
        </template>
        <template v-else>
          <p>طباعة</p>
        </template>
      </sidebar-link>
      <sidebar-link to="/dashboard?enableRTL=true">
        <i class="tim-icons icon-world"></i>
        <template v-if="!isRTL">
          <p>RTL Support</p>
        </template>
        <template v-else>
          <p>دعم RTL</p>
        </template>
      </sidebar-link> -->
    </side-bar>
    <!-- <sidebar-share :background-color.sync="backgroundColor"></sidebar-share> -->

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>

  </div>
</template> 
<style lang="scss"></style>
<script>

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
// import SidebarShare from "./SidebarSharePlugin.vue";
import MobileMenu from "./MobileMenu.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";



export default{
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    SideBar,
    SidebarLink,
    // SidebarShare
  },
  data() {
    return {
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
<style scoped>
p{
  color:black;
  font-weight: bolder;
  font-size:130%;
  margin-left: 15px;
}
i{
  color: black;
}


</style>
