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
        return ['#', 'insurance_name', 'contact_number', 'address', 'status', 'action']
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
      if (confirm('Are you sure you want to delete ' + data.insurance_name +'?')) {
          this.$store.dispatch('insurance/deleteInsurance', data.id);
      }
      // this.$emit('event_child', data, 'delete');
    },
  }
}
</script>
