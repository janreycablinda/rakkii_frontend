<template>
    <div>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="table_data"
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
              :to="'/customers/customer-profile/' + item.customer_id + '/projects'"
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
              :to="'/insurance/insurance-profile/' + item.insurance_id + '/profile'"
            >
            {{item.insurance.insurance_name}}
            </CLink>
          </td>
        </template>
        <template #date="{item}">
          <td>
            {{$root.momentFormatDateTime(item.date)}}
          </td>
        </template>
        <template #payment_status="{item}">
          <td>
            <CBadge :color="getPaymentBadge(item.payment_status)" class="capetalize">Owner Payment: {{item.payment_status}}</CBadge><br>
            <CBadge :color="getPaymentBadge(item.payment_loa_status)" class="capetalize">LOA Payment: {{item.payment_loa_status}}</CBadge>
          </td>
        </template>
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)" class="capetalize">{{item.status}}</CBadge>
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
  data(){
    return {
      table_data: []
    }
  },
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['job_order_no', 'customer', 'vehicle', 'plate_no', 'insurance', 'payment_status', 'date', 'status']
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
  watch:{
    items(){
      let data = [];
      this.items.forEach(item => {
        console.log(item);
        let total_owner_settlement = item.payables.policy_deductible + item.payables.betterment - item.payables.discount;
        let total_paid = 0;
        let total_loa_paid = 0;
        let OwnerStatus = 'Unpaid';
        let LoaStatus = 'Unpaid';
        item.payments.forEach(item => {
          if(item.payment_of == 'Owner'){
            total_paid += item.amount;
          }else{
            total_loa_paid += item.amount;
          }
        });
        if(total_paid){
          if(total_paid >= total_owner_settlement){
            OwnerStatus = 'Paid';
          }else{
            OwnerStatus = 'Partial';
          }
        }
        if(total_loa_paid){
          if(total_loa_paid >= item.payables.net){
            LoaStatus = 'Paid';
          }else{
            LoaStatus = 'Partial';
          }
        }
        
        let items = {
            ...item,
            ...{payment_status: OwnerStatus, payment_loa_status: LoaStatus}
        };
        data.push(items);
      });
      this.table_data = data;
    }
  },
  methods: {
    getBadge (status) {
    return status === 'Completed' ? 'success'
            : status === 'Pending' ? 'secondary'
            : status === 'Inprogress' ? 'warning'
            : status === 'Cancel' ? 'danger'
            : status === 'On hold' ? 'danger' : 'primary'
    },
    getPaymentBadge(status){
    return status === 'Paid' ? 'success'
        : status === 'Unpaid' ? 'secondary'
        : status === 'Partial' ? 'warning'
        : status === 'onhold' ? 'danger' : 'primary'
    },
    getValue(data){
      console.log(data);
      this.$emit('event_child', data);
    },
    ownerPaymentStatus(data){
      
      let sum = 0;
      let status = 'Unpaid';
      let settlement_payment = data.payables.policy_deductible + data.payables.betterment - data.payables.discount;
      data.payments.forEach(item => {
        if(item.payment_if == 'Owner'){
          sum += item.amount;
          console.log('test');
        }
      });
      console.log(sum);
      if(sum >= settlement_payment){
        status = 'Paid'
      }else{
        status = 'Partial'
      }
      return status;
    },
    getValueDel(data){
      if (confirm('Are you sure you want to delete ' + data.customer.company_name +'?')) {
        // Save it!
      }
    },
  }
}
</script>
