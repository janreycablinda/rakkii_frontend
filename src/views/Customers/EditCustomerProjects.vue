<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>Job Order</strong>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                      <!-- <div class="inline">
                          <v-select
                            :options="$options.customermultiselectOptions"
                            placeholder="Select Customer"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            class="select-custom"
                          />
                          <CButton @click="showModalAddData = new Date()" class="select-custom-btn" color="primary"><CIcon size="sm" name="cil-plus"/></CButton>
                      </div> -->
                      Name: Janrey Cablinda
                    </CCol>
                    <CCol lg="6">
                        <CInput value="11/06/2021" type="date" placeholder="Date"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <CInput value="San juan 2 lapasan" placeholder="Address"/>
                    </CCol>
                    <CCol lg="6">
                        <CInput placeholder="Total Repair Cost"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <CInput value="PHIL. BRITISH" placeholder="Insurance"/>
                    </CCol>
                    <CCol lg="6">
                        <CInput placeholder="Less: Policy Deductible"/>
                    </CCol>
                </CRow>
                <CRow>
                  <CCol lg="6">
                    <CSelect
                      :value.sync="form.insurance_type"
                      placeholder="Insurance Type"
                      :options="['Private Insurance', 'Third Party Claim', 'GSIS', 'Bidding']"
                    />
                  </CCol>
                  <CCol lg="6">
                        <CInput placeholder="Betterment"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <CInput placeholder="Vehicle"/>
                    </CCol>
                    <CCol lg="6">
                        <CInput placeholder="NET"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <CInputFile
                          label="LOA EVALUATION FILES"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput placeholder="Discount"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <table class="custom-table">
                            <tr>
                                <th width="80%">SCOPE OF WORK</th>
                                <th width="10%">LABOR</th>
                                <th width="10%">PARTS</th>
                            </tr>
                          <div style="width:125%;"  class="mt-2">
                            <ol class="c" >
                              <li v-for="(serv, index) in form.services" :key="index">
                                <Services
                                v-on:child_data="child_action"
                                :services="serv"
                                />
                              </li>
                            </ol>
                          </div>
                          <tr>
                            <td align="right">
                              SUB-TOTAL:
                            </td>
                            <td class="bordered-left bordered-top bordered-bottom">
                              ₱{{sub_total_labor}}
                            </td>
                            <td class="bordered-left bordered-top">
                              ₱{{sub_total_parts}}
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              12% VAT:
                            </td>
                            <td class="bordered-left bordered-bottom">
                              ₱{{total_vat}}
                            </td>
                            <td class="bordered-left bordered-top">

                            </td>
                          </tr>
                          <tr>
                            <td align="center" class="bordered-top">
                              <strong>TOTAL LABOR AND PARTS</strong>
                            </td>
                            <td class="bordered-left bordered-right">
                              ₱{{total_labor_parts}}
                            </td>
                            <td>

                            </td>
                          </tr>
                        </table>
                    </CCol>
                </CRow>
              <CRow>
                <CCol lg="12" align="center">
                  <hr>
                  <h4>Document's Verification</h4>
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Vehicle OR/CR"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Driver’s License w/OR"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Police Report/Affidavit of Accident"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Comprehensive Insurance Policy"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Pictures"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Third Party Claim'">
                  <CInputFile
                    label="Certificate of No Claim"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Trip Ticket"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Authorization Letter with Letterhead for government agencies"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Authorization Letter for individual"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Request for Quotation"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Mayor’s Permit"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="PHILGEPS"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Omnibus Sworn Statement"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Tax Clearance/ITR"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="12">
                  <CButton color="success">Save</CButton>
                  <!-- <CButton class="ml-2" color="success">Save for Approval</CButton> -->
                </CCol>
              </CRow>
            </CCardBody>
        </CCard>
        <AddCustomerModal
        :showModalAddData="showModalAddData"
        />
    </div>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import Services from './Services';
import AddCustomerModal from './AddCustomerModal';

export default {
    data(){
      return {
        showModalAddData: '',
        form: {
          customer_id: '',
          address: '',
          insurance: '',
          insurance_type: '',
          estimate_date: '',
          services: [
            {
            id: '',
            labor_fee: 0,
            parts_fee: 0,
            sub_services: []
            }
          ]
        }
      }
    },
    components: {
        vSelect,
        Services,
        AddCustomerModal
    },
    computed:{
      sub_total_labor(){
        let service_labor = 0;
        let sub_service_parts = 0
        this.form.services.forEach(item => {
          service_labor += parseInt(item.labor_fee)
          item.sub_services.forEach(item_sub => {
            sub_service_parts += parseInt(item_sub.labor_fee);
          })
        })
        return service_labor + sub_service_parts;
      },
      sub_total_parts(){
        let service_parts = 0;
        let sub_service_parts = 0
        this.form.services.forEach(item => {
          service_parts += parseInt(item.parts_fee)
          item.sub_services.forEach(item_sub => {
            sub_service_parts += parseInt(item_sub.parts_fee);
          })
        })
        
        return service_parts + sub_service_parts;
      },
      total_vat(){
        return this.sub_total_labor * 0.12;
      },
      total_labor_parts(){
        return this.sub_total_labor + this.sub_total_parts + this.total_vat;
      }
    },
    methods: {
      child_action(data, event){
        if(event == 'add'){
          
            this.form.services.push({
              id: '',
              labor_fee: 0,
              parts_fee: 0,
              sub_services: []
            })
          
        }else{
          if(this.form.services.length != 1){
            this.form.services.splice(this.form.services.indexOf(data), 1);
          }
        }
        
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
        { value: '1', label: 'PARTS TO BE REPLACE' },
        { value: '2', label: 'PULLDOWN ALL NEC. PARTS TO GIVEWAY FOR REPAIR' },
        { value: '3', label: 'TINSMITH JOB' },
        { value: '4', label: 'PAINTING JOB' },
        { value: '5', label: 'PAINT MATERIALS' },
    ],
    customermultiselectOptions: [
        { value: 'AL', label: 'Janrey A. Cablinda' },
        
    ],
}
</script>
<style>
.inline {
    display:flex;
}
</style>
