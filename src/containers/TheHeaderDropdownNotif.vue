<template>
  <CDropdown 
    placement="bottom-end"
    :caret="false"
    in-nav
    class="c-header-nav-item d-md-down-none mx-2"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-bell"/>
        <CBadge shape="pill" v-if="$store.state.notification.notification_message" color="danger">{{$store.state.notification.notification_message.length}}</CBadge>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader 
      tag="div" 
      class="text-center bg-light"
      style="background-color:#2E58A6 !important; color:#fff;"
    >
      <strong>You have {{$store.state.notification.notification_message.length}} new notifications</strong>
    </CDropdownHeader>
    <CDropdownItem :to="message.link" v-for="message in $store.state.notification.notification_message" :key="message.id">
      <div style="width:99%;"><CIcon :name="message.icon" class="text-success"/>{{message.message}} <br> <small style="float:right;">{{$root.momentParse(message.created_at)}}</small></div> <div style="width:1%;"></div>
    </CDropdownItem>
    <CDropdownItem v-if="$store.state.notification.notification_message.length == 0" style="justify-content:center;">
      No New Notification Found
    </CDropdownItem>
    <CDropdownHeader
      tag="div" 
      class="text-center bg-light pt-1"
      style="background-color:#2E58A6 !important;"
    >
      <CLink style="color:#fff !important;"><strong>View All Notifications</strong></CLink>
    </CDropdownHeader>
  </CDropdown>
</template>
<script>
export default {
  name: 'TheHeaderDropdownNotif',
  data () {
    return { itemsCount: 0 }
  },
  mounted(){
    window.Echo.channel('notification')
    .listen('RealTimeNotification', () => {
      this.$store.dispatch('notification/fetchNotification');
    })
    this.$store.dispatch('notification/fetchNotification');
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>