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
        <template #job_order_no="{item}">
            <td>
                <CLink
                    :to="'/sales/job-order/edit-job-order/' + item.job_order_id"
                >
                JO-000{{item.job_order.job_order_no}}
                </CLink>
            </td>
        </template>
        <template #customer_name="{item}">
            <td>
              <span v-if="item.job_order">
                {{item.job_order.customer.company_name}}
              </span>
            </td>
        </template>
        <template #rcpt_no="{item}">
            <td>
                RCPT-000{{item.receipt_no}}
            </td>
        </template>
        <template #amount="{item}">
            <td>
                ₱{{item.amount}}
            </td>
        </template>
        <template #encoded_by="{item}">
            <td>
                {{item.user.name}}
            </td>
        </template>
        <template #date_paid="{item}">
            <td>
                {{item.payment_date}}
            </td>
        </template>
        <template #action="{item}">
            <td>
                <div style="display:flex;">
                <CButton size="sm" color="primary" @mouseover="hoverValue(item)" @click="getValue(item)"><CIcon name="cil-print"/></CButton> &nbsp;
                <CButton size="sm" color="info" @click="getValueEdit(item)"><CIcon name="cil-pen"/></CButton>&nbsp;
                <CButton size="sm" color="danger" @click="getValueDel(item)"><CIcon name="cil-trash"/></CButton>
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
        return ['rcpt_no', 'payment_type', 'amount', 'date_paid', 'encoded_by', 'action']
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
    return status === 'completed' ? 'success'
        : status === 'pending' ? 'secondary'
        : status === 'inprogress' ? 'warning'
        : status === 'cancel' ? 'danger'
        : status === 'onhold' ? 'danger' : 'primary'
    },
    getValueEdit(data){
      this.$emit('edit_payment', data);
    },
    getValue(data){
      this.$emit('event_child', data);
    },
    hoverValue(data){
      this.$emit('hover_value_print', data);
    },
    getValueDel(data){
      console.log(data);
      const params = {
        id: data.id,
        billing_statement_id: data.billing_statement_id
      }
      if (confirm('Are you sure you want to delete ' + data.receipt_no +'?')) {
        this.$store.dispatch('payments/deletePayment', params).then(response => {
          this.$emit('delete_payment', response);
        });
      }
    },
  }
}
</script>
