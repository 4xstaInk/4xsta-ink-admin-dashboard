<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{show: isOpen}">
      <a data-toggle="dropdown" class="settings-icon">
        <i class="fa fa-cog fa-2x" @click="toggleDropDown">
        </i>
      </a>
      <ul class="dropdown-menu" :class="{show:isOpen}">
        <li class="header-title">Sidebar Background</li>
        <li class="adjustments-line">
          <a class="switch-trigger background-color">
            <div class="badge-colors text-center">
              <span v-for="item in sidebarColors" :key="item.color" class="badge filter"
                    :class="[`badge-${item.color}`,{active:item.active}]"
                    :data-color="item.color"
                    @click="changeSidebarBackground(item)">
              </span>
            </div>
            <div class="clearfix"></div>
          </a>
        </li>


        <!-- <li class="button-container d-flex justify-content-center">
          <gh-btns-star slug="creativetimofficial/vue-white-dashboard" show-count></gh-btns-star>
          <gh-btns-fork slug="creativetimofficial/vue-white-dashboard" show-count></gh-btns-fork>
        </li> -->

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      backgroundColor: String
    },
    data(){
      return {
        isOpen: false,
        sidebarColors: [
          // { color: 'white', active: false, value: 'white' },
          // { color: 'info', active: true, value: 'blue' },
          // { color: 'success', active: false, value: 'green' }
        ]
      }
    },
    methods:{
      // toggleDropDown(){
      //   this.isOpen = !this.isOpen
      // },
      // closeDropDown(){
      //   this.isOpen = false
      // },
      // toggleList(list, itemToActivate) {
      //   list.forEach((listItem) => {
      //     listItem.active = false
      //   });
      //   itemToActivate.active = true
      // },
      // changeSidebarBackground(item){
      //   this.$emit('update:backgroundColor', item.value)
      //   this.toggleList(this.sidebarColors, item)
      // }
    }
  }
</script>
<style>
</style>
