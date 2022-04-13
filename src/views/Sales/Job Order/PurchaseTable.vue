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
        :items-per-page="small ? 10 : 10"
        :tableFilter='{ placeholder: "Search", label: " "}'
        :dark="dark"
        :table-filter="true"
        pagination
        :size="size"
        items-per-page-select
      >
        <template #supplier="{item}">
          <td>
            <CLink
              >
                {{item.supplier.supplier_name}}
            </CLink>
          </td>
        </template>
        <template #total_purchase="{item}">
          <td>
              ₱{{sumAmount(item.purchase_items) | numFormat('1,000')}}
          </td>
        </template>
        <template #date="{item}">
          <td>
              {{item.date}}
          </td>
        </template>
        <template #receipt="{item}">
          <td>
              <CLink
              @click="downloadDocs(receipt)"
              v-for="receipt in item.receipts" :key="receipt.id"
              >
                {{receipt.receipt}}<br>
            </CLink>
          </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <CButton size="sm" @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton>&nbsp;
                <!-- <CButton @click="getValue(item)" color="warning"><CIcon name="cil-check-alt"/></CButton> &nbsp; -->
                <CButton size="sm" @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
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
        return ['supplier', 'total_purchase', 'date', 'receipt', 'action']
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
    dark: Boolean,
    size: String
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    sumAmount(data){
      console.log(data);
      let sum = 0;
      if(data){
        data.forEach(item => {
          const times = item.qty * item.price;
          sum += times;
        })
      }
      return sum;
    },
    getValue(data){
      this.$emit('edit_purchase', data);
    },
    getValueDel(data){
      console.log(data);
      if (confirm('Are you sure you want to delete ' + data.supplier.supplier_name +'?')) {
        this.$store.dispatch('purchase/deletePurchase', data).then(response => {
          this.$emit('purchase_added', response);
        });
      }
    },
    downloadDocs(data){
        this.$store.dispatch('document/downloadDocument', data.receipt);
    }
  },
  created(){
      console.log(process.env.VUE_APP_BACKEND);
  }
}
</script>
