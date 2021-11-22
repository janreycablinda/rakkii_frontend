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
        <template #estimate_no="{item, index}">
          <td>
            <CLink
              @click="getValue(item)"
            >
              EST-000{{item.id}}
            </CLink>
          </td>
        </template>
        <template #customer="{item}">
          <td>
            <CLink
              :to="'/customers/customer-profile/' + item.customer_id + '/profile'"
            >
            {{item.customer.company_name}}
            </CLink>
          </td>
        </template>
        <template #vehicle="{item}">
          <td>
            {{item.property.vehicle.vehicle_name}}
          </td>
        </template>
        <template #plate_no="{item}">
          <td>
            {{item.property.plate_no}}
          </td>
        </template>
        <template #insurance="{item}">
          <td>
            <CLink
              href="#"
            >
            {{item.insurance.insurance_name}}
            </CLink>
          </td>
        </template>
        <template #status="{item}">
          <td>
            <CBadge color="secondary">Draft</CBadge>
          </td>
        </template>
        <!-- <template #action="{item}">
            <td>
                <div>
                <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getValue(item)" color="warning"><CIcon name="cil-check-alt"/></CButton> &nbsp;
                <CButton @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
                </div>
            </td>
        </template> -->
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
        return ['estimate_no', 'customer', 'vehicle', 'plate_no', 'insurance', 'date', 'status']
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
      this.$emit('event_child', data);
    },
    getValueDel(data){
      if (confirm('Are you sure you want to delete ' + data.customer.company_name +'?')) {
        // Save it!
      }
    },
  }
}
</script>
