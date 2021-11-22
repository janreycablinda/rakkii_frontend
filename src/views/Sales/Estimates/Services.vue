<template>
  <tr>
  <td width="78%" >
        <div class="inline">
          <v-select
            :options="$store.state.services.services | servicesFilter"
            placeholder="Select Services"
            style="width:90%;"
            v-model="services.id"
          >
            <template #list-header>
              <li style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" @click="openAddServices" href="#">ADD SERVICES</a></li>
            </template>
          </v-select>
          <CButton @click="addSubServices"  size="sm" class="ml-1" color="primary"><CIcon name="cil-playlist-add"/></CButton>
          <CButton @click="addServices" size="sm" class="ml-1" color="primary"><CIcon name="cil-plus"/></CButton>
          <CButton @click="removeServices" size="sm" class="ml-1" color="danger"><CIcon name="cil-x"/></CButton>
        </div>
            <ul class="mt-1" style="width:125%;">
              <li v-for="(sub, index) in services.sub_services" :key="index">
                <SubServices
                :sub="sub"
                v-on:child_data_sub="childRemoveSub"
                v-on:child_data_add_sub="childAddSub"
                />
              </li>
            </ul>

<!--        <ul>-->
<!--          <li>FRT BUMBER COVER</li>-->
<!--          <li>BUMPER CLIPS</li>-->
<!--        </ul>-->

<!--      <li>PULLDOWN ALL NEC. PARTS TO GIVEAWAY FOR REPAIR:</li>-->

  </td>
  <td width="10%">
    <CInput v-model="services.labor_fee" style="margin-top:-57px; !important">
      <template #prepend-content>₱</template>
    </CInput>
  </td>
  <td width="10%">
    <CInput v-model="services.parts_fee" style="margin-top:-57px; !important">
      <template #prepend-content>₱</template>
    </CInput>
  </td>
  
  </tr>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import SubServices from './SubServices'

export default{
  data(){
    return {
      sub_form: []
    }
  },
  components: {
    vSelect,
    SubServices,
  },
  watch:{
    id(){
      this.services.sub_services = [];
    },
    services_changes(newVal, oldVal){
      // console.log(oldVal);
      // console.log(newVal);
      // console.log(this.services);
      // console.log(newVal[0].sub_services.at(-1));
      
      // newVal.forEach(item => {
      //   console.log(item);
      //   if(item.id == this.services.services_id){
      //     this.$emit('child_sub_services_changes', item.sub_services.at(-1));
      //   }
      // })
      if(oldVal.length != 0){
        newVal.forEach((item, index) => {
          if(item.sub_services.length !== oldVal[index].sub_services.length){
            const newItem = item.sub_services.at(-1);
            if(newItem.services_id == this.services.id.value){
              this.$emit('child_sub_services_changes', newItem);
            }
          }
        })
      }
      
      
    }
  },
  computed: {
    id(){
      return this.services.id;
    },
    services_changes(){
      return this.$store.state.services.services;
    }
  },
  filters: {
    servicesFilter(data){
      if(data){
        const options = data.reduce((option, item) => {
            option.push({label: item.services_name, sub_services: item.sub_services, value: item.id})
            return option
        }, [])
        return options;
      }
    }
  },
  props: ['services'],
  methods: {
    addServices(data){
      console.log(data);
      this.$emit('child_data', data, 'add');
    },
    openAddServices(){
      this.$emit('child_services', 'add');
    },
    removeServices(data){
      console.log(data);
      this.$emit('child_data', data, 'delete');
    },
    childAddSub(data){
      this.$emit('child_add_sub_services', data);
    },
    addSubServices(){
      if(this.services.id){
        this.services.sub_services.push({
          services_id:this.services.id.value,
          services_name:this.services.id.label,
          id: '',
          sub_services: this.services.id.sub_services,
          labor_fee: 0,
          parts_fee: 0
        })
      }
    },
    childRemoveSub(data){
        this.services.sub_services.splice(this.services.sub_services.indexOf(data), 1);
    },
    withPopper(dropdownList, component, { width }) {
      /**
       * We need to explicitly define the dropdown width since
       * it is usually inherited from the parent with CSS.
       */
      dropdownList.style.width = width

      /**
       * Here we position the dropdownList relative to the $refs.toggle Element.
       *
       * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
       * the dropdownList overlap by 1 pixel.
       *
       * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
       * wrapper so that we can set some styles for when the dropdown is placed
       * above.
       */
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            },
          },
        ],
      })

      return () => popper.destroy()
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
