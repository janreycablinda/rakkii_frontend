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
                <CLink @click="getValue(item)">BIL-000{{item.billing_statement_no}}</CLink>
            </td>
        </template>
        <template #job_order_no="{item}">
            <td>
                <CLink :to="'/sales/job-order/edit-job-order/' + item.job_order_id">JO-000{{item.job_order.job_order_no}}</CLink>
            </td>
        </template>
        
        <template #billed_to="{item}">
            <td>
                <span v-if="item.payment_for == 'customer'">{{item.customer.company_name}}</span>
                <span v-else><CLink :to="'/insurance/insurance-profile/' + item.insurance_id + '/profile'">{{item.insurance.insurance_name}}</CLink></span>
            </td>
        </template>
        <template #total_amount_due="{item}">
            <td>
                <span>₱{{item.amount | numFormat('1,000')}}</span>
            </td>
        </template>
        <template #outstanding_balance="{item}">
            <td>
                <span>₱{{calculateAmount(item) | numFormat('1,000')}}</span>
            </td>
        </template>
        <template #status="{item}">
            <td>
                <CBadge :color="getBadge(billingStatus(item))" class="capetalize">{{billingStatus(item)}}</CBadge>
            </td>
        </template>
        <!-- <template #action="{item}">
            <td>
                <div>
                <CButton @click="getValue(item)" size="sm" color="primary"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getPaymentValue(item)" size="sm" color="info"><CIcon name="cil-description"/></CButton> &nbsp;
                <CButton @click="getPaymentValue(item)" size="sm" color="warning"><CIcon name="cil-money"/></CButton> &nbsp;
                <CButton @click="getValueDel(item)" size="sm" color="danger"><CIcon name="cil-trash"/></CButton>
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
        return ['billing_no', 'job_order_no', 'total_amount_due', 'outstanding_balance', 'billed_to', 'plate_no', 'date', 'status']
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
    calculateAmount(data){
      console.log(data);
      var sum = 0;
      var amount = data.amount;
      data.billing_payment.forEach(item => {
        sum+=item.amount;
      })
      let calc = amount-sum;

      return calc < 0 ? 0 : calc;
    },
    billingStatus(data){
      var sum = 0;
      var amount = data.amount;
      data.billing_payment.forEach(item => {
        sum+=item.amount;
      })
      
      return sum >= amount ? 'Paid'
        : sum > 0 ? 'Partial Payment'
        : 'Unpaid'
    },
    getPaymentValue(data){
      this.$emit('payment_modal', data);
    },
    getValue(data){
      this.$emit('event_child', data);
    },
    getValueDel(data){
      if (confirm('Are you sure you want to delete BIL-000' + data.billing_statement_no +'?')) {
        this.$store.dispatch('billing/deleteBilling', data.id);
      }
    },
  }
}
</script>
