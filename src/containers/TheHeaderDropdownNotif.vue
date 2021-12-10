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
        <CBadge shape="pill" color="danger">{{itemsCount}}</CBadge>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader 
      tag="div" 
      class="text-center bg-light"
    >
      <strong>You have {{itemsCount}} notifications</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user-follow" class="text-success"/> <b class="mr-1">Janrey </b> created new Job Order
    </CDropdownItem>
  </CDropdown>
</template>
<script>
export default {
  name: 'TheHeaderDropdownNotif',
  data () {
    return { itemsCount: 0 }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>