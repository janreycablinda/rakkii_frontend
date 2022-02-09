<template>
    <div>
      <div data-v-00037ed8="" class="position-relative table-responsive">
        <table data-v-00037ed8="" class="table">
            <thead data-v-00037ed8="">
              <tr data-v-00037ed8="">
                  <th data-v-00037ed8="" class="" style="vertical-align: middle; overflow: hidden;">
                    <div data-v-00037ed8="">Role Name</div>
                  </th>
                  <th data-v-00037ed8="" class="" style="vertical-align: middle; overflow: hidden;">
                    <div data-v-00037ed8="">Permissions</div>
                  </th>
                  <th data-v-00037ed8="" class="" style="vertical-align: middle; overflow: hidden;">
                    <div data-v-00037ed8="">Action</div>
                  </th>
              </tr>
            </thead>
            <tbody data-v-00037ed8="" class="position-relative">
              <tr data-v-00037ed8="" v-for="item in items" :key="item.id">
                  <td data-v-00037ed8="" width="15%"> {{item.role_name}} </td>
                  <td data-v-00037ed8="">
                      <CBadge class="ml-1" v-for="perm in item.permissions" :key="perm.id" color="primary"> 
                        {{perm.permission.title}}
                      </CBadge>
                  </td>
                  <td data-v-00037ed8="" width="15%">
                    <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                    <CButton @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
                  </td>
              </tr>
            </tbody>
        </table>
      </div>
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
        return ['role_name', 'permissions', 'action']
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
      if (confirm('Are you sure you want to delete ' + data.role_name +'?')) {
        this.$store.dispatch('roles/deleteRole', data.id);
      }
    },
  }
}
</script>
