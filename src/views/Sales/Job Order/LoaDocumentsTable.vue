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
        items-per-page-select
      >
        <template #file="{item}">
          <td>
              <CLink
              @click="downloadDocs(item)"
              >
                {{item.file_name}}
            </CLink>
          </td>
        </template>
        <template #date="{item}">
          <td>
              {{$root.momentFormatDateTime(item.created_at)}}
          </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <!-- <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getValue(item)" color="warning"><CIcon name="cil-check-alt"/></CButton> &nbsp; -->
                <CButton size="sm" @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
                </div>
            </td>
        </template>
      </CDataTable>
    </div>
</template>
<script>

import axios from 'axios';
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['file', 'date', 'action']
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
      console.log(data);
      this.$emit('event_child', data);
    },
    getValueDel(data){
      console.log(data);
      if (confirm('Are you sure you want to delete ' + data.file_name +'?')) {
        this.$store.dispatch('document/deleteLoaDocument', data).then(response => {
          this.$emit('document_added', response);
        });
      }
    },
    downloadDocs(data){
        this.$store.dispatch('document/downloadDocument', data.file_name);
    }
  },
  created(){
      console.log(process.env.VUE_APP_BACKEND);
  }
}
</script>
