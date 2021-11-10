<template>
  <tr>
    <td width="98.5%" style="margin-right:100px" class="inline">
      <v-select
        :options="$options.submultiselectOptions"
        placeholder="Select Sub Services"
        append-to-body
        :calculate-position="withPopper"
        style="width:90%;"
      />
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
import { createPopper } from '@popperjs/core'

export default{
  components: {
    vSelect
  },
  props: ['sub'],
  methods: {
    deleteSubServices(data){
      
      this.$emit('child_data_sub', data);
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
