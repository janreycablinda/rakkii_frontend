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
        <template #billing_no="{item}">
            <td>
                <CLink>BIL-000{{item.billing_statement_no}}</CLink>
            </td>
        </template>
        <template #billed_to="{item}">
            <td>
                <span v-if="item.payment_for == 'customer'">BIL-000{{item.customer.company_name}}</span>
                <span v-else><CLink :to="'/insurance/insurance-profile/' + item.insurance_id + '/profile'">{{item.insurance.insurance_name}}</CLink></span>
            </td>
        </template>
        <template #amount="{item}">
            <td>
                <span v-if="item.billing_payment">₱{{item.billing_payment.amount}}</span>
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
                <CButton @click="getValue(item)" size="sm" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getValue(item)" size="sm" color="warning"><CIcon name="cil-money"/></CButton> &nbsp;
                <CButton @click="getValueDel(item)" size="sm" color="danger"><CIcon name="cil-trash"/></CButton>
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
        return ['billing_no', 'amount',  'billed_to', 'date', 'status', 'action']
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
      return status === 'Paid' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Unpaid' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getValue(data){
      this.$emit('event_child', data, 'edit');
    },
    getValueDel(data){
      if (confirm('Are you sure you want to delete BIL-000' + data.billing_statement_no +'?')) {
        this.$store.dispatch('billing/deleteBilling', data.id);
      }
    },
  }
}
</script>
