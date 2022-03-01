<template>
  <tr>
    <td width="98.5%" style="margin-right:100px" class="inline">
      <v-select
        :options="sub_services | subServicesFilter"
        placeholder="Select Sub Services"
        style="width:90%;"
        v-model="sub.sub_services_id"
        :reduce="label => label.value"
      >
        <template #list-header>
          <div style="display:flex;">
            <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="openAddSubServices(sub)"><CIcon name="cil-plus"/> ADD</a></li>
            <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete"><CIcon name="cil-trash"/> DELETE</a></li>
          </div>
        </template>
      </v-select>
<!--      <CButton size="sm" class="ml-1" color="primary"><CIcon name="cil-plus"/></CButton>-->
      <CButton @click="deleteSubServices" size="sm" class="ml-1" color="danger"><CIcon name="cil-x"/></CButton>
    </td>
    <td width="11.5%">
      <CInput v-model="sub.labor_fee">
        <template #prepend-content>₱</template>
      </CInput>
    </td>
    <td width="10%">
      <CInput v-model="sub.parts_fee">
        <template #prepend-content>₱</template>
      </CInput>
    </td>
  </tr>
</template>
<script>
import vSelect from 'vue-select'

export default{
  data(){
      return {
          sub_services: []
      }
  },
  components: {
    vSelect,
  },
  props: ['sub', 'trigger_add_sub', 'trigger_delete_sub'],
  watch: {
    trigger_add_sub(data){
      if(data.data.services_id == this.sub.sub_services.services_id){
        this.$store.dispatch('sub_services/findSubServices', this.sub.sub_services.services_id).then(response => {
          this.sub_services = response;
        });
      }
    },
    trigger_delete_sub(data){
      if(data.data.services_id == this.sub.sub_services.services_id){
        this.$store.dispatch('sub_services/findSubServices', this.sub.sub_services.services_id).then(response => {
          this.sub_services = response;
        });
      }
    }
  },
  filters: {
    subServicesFilter(data){
      if(data){
        const options = data.reduce((option, item) => {
            option.push({label: item.services_name, value: item.id})
            return option
        }, [])
        return options;
      }
    }
  },
  methods: {
    showModalDataDelete(){
      console.log(this.sub);
      this.$emit('child_data_delete', {trigger:new Date(), delete_type: 'SUBSERVICES', services_id: this.sub.sub_services.services_id, modal_size:'md'})
    },
    openAddSubServices(data){
      this.$emit('child_data_add_sub', data);
    },
    deleteSubServices(data){
      this.$emit('child_data_sub', data);
    }
  },
  created(){
    if(this.sub){
      this.$store.dispatch('sub_services/findSubServices', this.sub.sub_services.services_id).then(response => {
        this.sub_services = response;
      });
    }
  }
}
</script>
