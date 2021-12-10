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
        <template #job_order_no="{item, index}">
          <td>
            <CLink
              @click="getValue(item)"
            >
              JO-000{{item.job_order_no}}
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
            <CBadge :color="getBadge(item.status)" class="capetalize">{{item.status}}</CBadge>
          </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <CButton size="sm" @click="getValue(item)" color="info"><CIcon name="cil-garage"/></CButton>
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
        return ['job_order_no', 'customer', 'vehicle', 'plate_no', 'insurance', 'date', 'status', 'action']
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
    return status === 'approved' ? 'success'
        : status === 'draft' ? 'secondary'
        : status === 'pending' ? 'warning'
        : status === 'disapproved' ? 'danger' : 'primary'
    },
    getValue(data){
      console.log(data);
      if (confirm('Please click yes to ' + data.customer.company_name + ' to the garage.')) {
        const params = {
            id: data.id,
            status: 'waiting'
        }
        this.$store.dispatch('job_orders/updateStatusJobOrder', params);
      }
    },
    getValueDel(data){
      if (confirm('Are you sure you want to delete ' + data.customer.company_name +'?')) {
        // Save it!
      }
    },
  }
}
</script>
