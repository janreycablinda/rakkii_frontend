<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>Request Job Estimate</strong>
                <div class="card-header-actions">
                    <strong>EST-000{{form.estimate_no}}</strong>
                </div>
            </CCardHeader>
            <CCardBody>
                <CMedia>
                <CRow>
                    <CCol lg="6">
                      <div class="inline">
                          <v-select
                            :options="$store.state.customer.customer | customerFilter"
                            placeholder="Select Customer"
                            class="style-chooser"
                            :reduce="label => label.value"
                            label="label"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            v-model="form.customer_id"
                          >
                          <template #open-indicator="{ attributes }">
                            &nbsp;
                          </template>
                          <template #spinner="{ loading }">
                          <div
                            v-if="true"
                          >
                            🔍
                          </div>
                          </template>
                          <template #footer>
                            <small class="form-text text-muted w-100">Customer</small>
                          </template>
                          <template #list-header>
                            <div style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalAddData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddAgentData = new Date()"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                          </template>
                          </v-select>
                      </div>

                    </CCol>
                    <CCol lg="6">
                        <CInput v-model="form.date" onblur="this.placeholder = 'Date'" onfocus="this.placeholder = ''" description="Date" placeholder="Date" type="date"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <v-select
                          :options="$store.state.property.property | propertyFilter"
                          placeholder="Select Vehicle"
                          class="style-chooser"
                          append-to-body
                          :calculate-position="withPopper"
                          style="width:100%;"
                          v-model="form.vehicle_id"
                          :reduce="label => label.value"
                          label="label"
                        >
                        <template #list-header>
                          <div style="display:flex;">
                              <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="addCarProperty(form.customer_id)"><CIcon name="cil-plus"/> ADD</a></li>
                              <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddAgentData = new Date()"><CIcon name="cil-trash"/> DELETE</a></li>
                          </div>
                        </template>
                        </v-select>
                    </CCol>
                    <CCol lg="6">
                        <v-select
                          :options="$store.state.insurance.insurance | insuranceFilter"
                          placeholder="Select Insurance"
                          class="style-chooser"
                          append-to-body
                          :calculate-position="withPopper"
                          style="width:100%;"
                          v-model="form.insurance"
                          :reduce="label => label.value"
                          label="label"
                        >
                        <template #list-header>
                          <div style="display:flex;">
                              <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddInsuranceData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                              <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddAgentData = new Date()"><CIcon name="cil-trash"/> DELETE</a></li>
                          </div>
                        </template>
                        </v-select>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="6">
                        <!-- <CInput v-if="$store.state.estimate.estimate" readonly :placeholder="'EST-000' + ($store.state.estimate.estimate.at(-1).id+1)"/> -->
                    </CCol>
                    <!-- <CCol lg="6">
                        <CInput v-model="form.insurance" onblur="this.placeholder = 'Insurance'" onfocus="this.placeholder = ''" placeholder="Insurance" description="Insurance"/>
                    </CCol> -->
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
                                v-on:child_services="openAddServices"
                                v-on:child_add_sub_services="childAddSubServices"
                                v-on:child_sub_services_changes="childSubChanges"
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
              </CMedia>
              <CElementCover v-if="media" :opacity="0.9"/>
              <CRow class="mt-3">
                <CCol lg="12">
                  <CButton @click="submit" color="success">UPDATE</CButton>
                  <!-- <CButton @click="submit_approval" class="ml-2" color="success">SAVE & SEND</CButton> -->
                </CCol>
              </CRow>
            </CCardBody>
        </CCard>
        <AddCustomerModal
        :showModalAddData="showModalAddData"
        />
        <AddServicesModal
        :AddServicesData="AddServicesData"
        />
        <AddSubServicesModal
        :AddSubServicesData="AddSubServicesData"
        />
        <AddCarPropertyModal
        :AddCarPropertyData="AddCarPropertyData"
        />
        <SubmitApprovalModal
        :AddSaveAndSendData="AddSaveAndSendData"
        />
        <AddInsuranceModal
        :AddInsuranceData="AddInsuranceData"
        />
    </div>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import Services from './EditServices';
import AddCustomerModal from './AddCustomerModal';
import AddServicesModal from './AddServicesModal';
import AddSubServicesModal from './AddSubServicesModal';
import AddCarPropertyModal from './AddCarPropertyModal';
import SubmitApprovalModal from './SubmitApprovalModal';
import AddInsuranceModal from './AddInsuranceModal';

export default {
    data(){
      return {
        showModalAddData: '',
        AddServicesData: '',
        AddSubServicesData: '',
        AddSaveAndSendData: '',
        AddCarPropertyData: '',
        AddInsuranceData: '',
        placement: 'bottom',
        media: true,
        form: {
          id: '',
          customer_id: '',
          date: '',
          insurance: '',
          insurance_type: '',
          vehicle_id: '',
          estimate_no: '',
          services: [
            {
            services_id: '',
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
        AddCustomerModal,
        AddServicesModal,
        AddSubServicesModal,
        AddCarPropertyModal,
        SubmitApprovalModal,
        AddInsuranceModal,
    },
    filters: {
      customerFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.company_name, value: item.id})
                return option
            }, [])
            return options;
        }
      },
      insuranceFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.insurance_name, insurance_type:item.insurance_type, value: item.id})
                return option
            }, [])
            return options;
        }
      },
      propertyFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.vehicle.vehicle_name + ' - ' + item.plate_no, value: item.id})
                return option
            }, [])
            return options;
        }
      },
    },
    watch: {
      customer_id(newVal){
        // this.form.vehicle_id = '';
        this.$store.dispatch('property/emptyProperty');
        this.$store.dispatch('property/findProperty', newVal);
      },
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
      insurance(){
        return this.form.insurance;
      },
      customer_id(){
        return this.form.customer_id;
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
      addCarProperty(data){
        this.AddCarPropertyData = {
          trigger: new Date(),
          data: data
        }
      },
      submit(){
        
        this.$store.dispatch('estimate/updateEstimate', this.form).then(() => {
            this.$router.replace({
              name: "Estimates"
            });
        });
      },
     
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
      passFiles(docName, prefix, files, id, data){
          
        //   this.form.documents.forEach(item => {
        //       console.log(item);
        //   })
        const index = this.form.documents.findIndex(item => item.document_type === docName);
        if(index !== -1){
          this.form.documents.splice(index, 1, {
            data: data,
            id: id,
            document_name: docName,
            document_type: docName,
            files: files,
            prefix: prefix,
            label: docName
          });
        }
      },
      childSubChanges(data){
        if(data){
          this.form.services.forEach(serv => {
            if(serv.id.value == data.services_id){
              serv.sub_services.every(sub => {
                sub.sub_services.push(data);
                return false;
              })
            }
          })
        }
      },
      childAddSubServices(data){
        this.AddSubServicesData = {
          trigger: new Date(),
          data: data
        }
      },
      openAddServices(){
        this.AddServicesData = new Date();
      },
      convertByProperty(originalObject, groupByProperty, secondProperty) {  
        var finalArray = [];  
        var uniqueVals = [];  
        originalObject.map((i) => {  
            var existingVals = uniqueVals.filter((j) => {  
                return (i[groupByProperty] == j)  
            });  
            if (existingVals.length == 0) {  
                uniqueVals.push(i[groupByProperty]);  
            }  
        });  
        uniqueVals.map((k) => {  
            var dataObj = [];  
            var expectedObj = {};  
            var items = originalObject.filter((l) => {  
                return (l[groupByProperty] == k)  
            });  
            items.map((m) => {  
                var obj = {};  
                obj[secondProperty] = m[secondProperty];  
                obj['file_name'] = m.file_name;
                obj['document_type'] = m.document_type;
                obj['id'] = m.id;
                dataObj.push(obj);
            });
            const split = dataObj[0].file_name.split('-');
            expectedObj[groupByProperty] = k;  
            expectedObj['data'] = dataObj;
            expectedObj['prefix'] = split[0];
            expectedObj['id'] = dataObj[0].id;
            console.log(k);
            if(k == 'Pictures'){
                expectedObj['files'] = [];
            }else{
                expectedObj['files'] = '';
            }
            expectedObj['document_name'] = dataObj[0].document_type;
            expectedObj['label'] = dataObj[0].document_type;
            finalArray.push(expectedObj);  
        });  
        return finalArray;
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
    created(){
      this.$store.dispatch('customer/fetchCustomer');
      this.$store.dispatch('services/fetchServices');
      this.$store.dispatch('insurance/fetchInsurance');
      
      this.$store.dispatch('estimate/findEstimate', this.$route.params.id).then(response => {
        
            this.form = {
                id: response.id,
                customer_id: response.customer_id,
                date: response.date,
                insurance: response.insurance_id,
                vehicle_id: response.vehicle_id,
                vehicle: response.vehicle_id,
                services: response.scope,
                estimate_no: response.estimate_no
            }
            
          setTimeout(() => this.media = false, 1000);
          
      });
    },
}
</script>
<style>
.inline {
    display:flex;
}
.align-self-start{
    display:none;
}
</style>
