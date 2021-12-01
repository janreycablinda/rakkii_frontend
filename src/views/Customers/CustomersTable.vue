<template>
    <div>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :tableFilter='{ placeholder: "Search", label: " "}'
        :dark="dark"
        :table-filter="true"
        pagination
        items-per-page-select
        
      >
        <template ##="{item, index}">
            <td>
                {{index+1}}
            </td>
        </template>
        <template #company_name_or_owner="{item}">
            <td>
                {{item.company_name}}
            </td>
        </template>
        <template #contact_number="{item}">
            <td>
                {{item.phone}}
            </td>
        </template>
        <template #status="{item}">
            <td>
                <CBadge :color="getBadge('Active')"> Active</CBadge>
            </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <!-- <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp; -->
                <CButton :to="'/customers/customer-profile/' + item.id + '/profile'" color="warning"><CIcon name="cil-address-book"/></CButton> &nbsp;
                <CButton @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
                </div>
            </td>
        </template>
      </CDataTable>
    </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['#', 'company_name_or_owner', 'contact_number', 'address', 'status', 'action']
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getValue(data){
      this.$emit('event_child', data, 'edit');
    },
    getValueDel(data){
      this.$emit('event_child', data, 'delete');
    },
  }
}
</script>
