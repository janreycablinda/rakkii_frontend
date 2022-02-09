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
        size="sm"
        :table-filter="true"
        pagination
        items-per-page-select
      >
        <template #rcpt_no="{item}">
            <td>
                {{item.receipt_no}}
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
        <template #date="{item}">
            <td>
                {{$root.momentFormatDateTime(item.date)}}
            </td>
        </template>
        <template #action="{item}">
            <td>
                <div style="display:flex;">
                <CLink size="20" @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CLink> &nbsp;
                <CLink size="sm" @click="getValueDel(item)" style="color:red;"><CIcon name="cil-trash"/></CLink>
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
        return ['rcpt_no', 'amount', 'payment_of', 'encoded_by', 'date', 'action']
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
    getValue(data){
      console.log(data);
      this.$emit('event_child', data);
    },
    getValueDel(data){
      
      if (confirm('Are you sure you want to delete ' + data.receipt_no +'?')) {
        const params = {
          id: data.id,
          job_order_id: data.job_order_id
        }
        this.$store.dispatch('job_orders/deletePayment', params).then(response => {
          this.$emit('event_child', response);
        })
      }
    },
  }
}
</script>
