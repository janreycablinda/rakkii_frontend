<template>
  <tr>
    <td width="98.5%" style="margin-right:100px" class="inline">
      <v-select
        :options="sub.sub_services | subServicesFilter"
        placeholder="Select Sub Services"
        style="width:90%;"
        v-model="sub.id"
      >
        <template #list-header>
          <li style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" @click="openAddSubServices(sub)" href="#">ADD SERVICES COMPONENT</a></li>
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
  components: {
    vSelect,
  },
  props: ['sub'],
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
    openAddSubServices(data){
      this.$emit('child_data_add_sub', data);
    },
    deleteSubServices(data){
      
      this.$emit('child_data_sub', data);
    }
  },
  multiselectOptions: [
    { value: 'AL', label: 'PARTS TO BE REPLACE' },
    { value: 'AK', label: 'PULLDOWN ALL NEC. PARTS TO GIVEWAY FOR REPAIR' },
    { value: 'AK', label: 'TINSMITH JOB' },
    { value: 'AK', label: 'PAINTING JOB' },
    { value: 'AK', label: 'PAINT MATERIALS' },
  ],
  submultiselectOptions: [
    { value: 'AL', label: 'FRT BUMPER COVER' },
    { value: 'AK', label: 'BUMBER CLIPS' },
    { value: 'AK', label: 'FRT BUMPER REINFORCEMENT' },
    { value: 'AK', label: 'REPAINT RUBDOWN AND SIMONIZE THE REPAIRED AREAS' },
  ]
}
</script>
