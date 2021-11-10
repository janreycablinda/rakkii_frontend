<template>
  <tr>
  <td width="78%" >
        <div class="inline">
          <v-select
            :options="$options.multiselectOptions"
            placeholder="Select Services"
            append-to-body
            :calculate-position="withPopper"
            style="width:90%;"
            v-model="services.id"
          />
          <CButton @click="addSubServices"  size="sm" class="ml-1" color="primary"><CIcon name="cil-playlist-add"/></CButton>
          <CButton @click="addServices" size="sm" class="ml-1" color="primary"><CIcon name="cil-plus"/></CButton>
          <CButton @click="removeServices" size="sm" class="ml-1" color="danger"><CIcon name="cil-x"/></CButton>
        </div>
            <ul class="mt-1" style="width:125%;">
              <li v-for="(sub, index) in services.sub_services" :key="index">
                <SubServices
                :sub="sub"
                v-on:child_data_sub="childRemoveSub"
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
    SubServices
  },
  props: ['services'],
  methods: {
    addServices(data){
      console.log(data);
      this.$emit('child_data', data, 'add');
    },
    removeServices(data){
      console.log(data);
      this.$emit('child_data', data, 'delete');
    },
    addSubServices(){
      this.services.sub_services.push({
        id: '',
        labor_fee: 0,
        parts_fee: 0
      })
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
