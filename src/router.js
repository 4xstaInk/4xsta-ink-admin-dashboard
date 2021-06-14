import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

import Transactions from "@/pages/Transactions.vue";
import ViewTransaction from "@/pages/Transactions/ViewTransaction.vue";

import ProviderConfiguration from "@/pages/ProviderConfiguration.vue";
import ViewProvider from "@/pages/Providers/ViewProvider.vue";

import PaymentConfiguration from "@/pages/PaymentConfiguration.vue";
import ViewPayment from "./pages/Payments/ViewPayment.vue";

import CountryConfiguration from "@/pages/CountryConfiguration.vue";
import ViewCountry from "./pages/Countries/ViewCountry.vue";

import Users from "@/pages/Users.vue";
import ViewUser from "./pages/Users/ViewUser.vue";

import Login from "./pages/LoginRegister/Login.vue";

const routes = [{
  path: "/",
  component: DashboardLayout,
  redirect: "dashboard",
  children:[
    {
      path: "dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "icons",
      name: "Icons",
      component: Icons
    },
    // Transactions
    {
      path: "transactions",
      name: "Transactions",
      component: Transactions
    },
    {
      path: "transactions/view-transaction/:id",
      name: "View-Transaction",
      component: ViewTransaction
    },
    // Providers
    {
      path: "provider-configuration",
      name: "Provider-configuration",
      component: ProviderConfiguration
    },
    {
      path: "provider-configuration/view-provider/:id",
      name: "view-provider",
      component: ViewProvider
    },
    // Payments
    {
      path: "payment-configuration",
      name: "Payment-configuration",
      component: PaymentConfiguration 
    },
    {
      path: "payment-configuration/view-payment/:id",
      name: "view-payment",
      component: ViewPayment
    },
    // Countries
    {
      path: "country-configuration",
      name: "Country-configuration",
      component: CountryConfiguration 
    },
    {
      path: "country-configuration/view-country/:country_iso",
      name: "view-country",
      component: ViewCountry
    },
    // Users
    {
      path: "users",
      name: "Users",
      component: Users 
    },
    {
      path: "users/view-user/:id",
      name: "view-user",
      component: ViewUser 
    },    
    {
      path: "maps",
      name: "Maps",
      component: Maps
    },
    {
      path: "notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "user",
      name: "User Profile",
      component: UserProfile
    },
    {
      path: "table",
      name: "Table List",
      component: TableList
    },
    {
      path: "typography",
      name: "Typography",
      component: Typography
    }
  ]
  }, 
   // -----------------------------------------
  //  Register  Login
 // ---------------------------------------
    {
      path: "/login",
      name: "Login",
      component: Login 
    }];

export default routes;
