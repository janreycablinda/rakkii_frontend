<template>
  <div>
    <router-view></router-view>
    <notifications-list />
    <loading-panel />
    <!-- <Updating/> -->
  </div>
</template>

<script>
import NotificationsList from './containers/NotificationsList';
import jQuery from 'jquery'
import LoadingPanel from './containers/LoadingPanel';
import Updating from './containers/Updating';

export default {
  name: 'App',
  components: {
    NotificationsList,
    LoadingPanel,
    Updating
  },
  watch: {
    $route(){
      jQuery(document).ready(function($){
        $("label").each(function() {
            var html = $(this).html().replace(/\*/g, "<span class=\"asterisk\">*</span>");
            $(this).html(html).find(".asterisk").css("color", "red");
        });
      })
    }
  },
  created(){
    
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
