<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>Request Job Estimate</strong>
                <div class="card-header-actions">
                    <strong>EST-000{{$store.state.estimate.estimate_new_no}}</strong>
                </div>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                      <div class="inline">
                        <div class="form-group">
                          <label>CUSTOMER *</label>
                          <v-select
                            :options="$store.state.customer.customer | customerFilter"
                            placeholder="Nothing Selected"
                            class="style-chooser"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            v-model="form.customer_id"
                            :isValid="checkIfValid('customer_id')"
                            :value.sync="$v.form.customer_id.$model"
                            :class="{ 'border-red': $v.form.customer_id.$anyError, 'border-green': $v.form.customer_id.required}"
                          >
                            <template #search="{attributes, events}">
                              {{attributes.value}}
                              <input
                                class="vs__search"
                                v-bind="attributes"
                                v-on="events"
                                :value="attributes.value"
                              />
                            </template>
                            <template>
                              &nbsp;
                            </template>
                            <template>
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
                                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none; cursor:pointer;" @click="showModalAddData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none; cursor:pointer;" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'CUSTOMER', modal_size:'lg'}"><CIcon name="cil-trash"/> DELETE</a></li>
                              </div>
                            </template>
                            </v-select>
                              <div v-if="$v.form.customer_id.$anyError == true" class="invalid-feedback" style="display:block;">
                                  Customer is required!
                              </div>
                            </div>
                        </div>
                    </CCol>
                    <CCol lg="6">
                        <CInput 
                        v-model="form.date" 
                        onblur="this.placeholder = 'Date'" 
                        onfocus="this.placeholder = ''" 
                        description="Date" 
                        placeholder="Date" 
                        label="Date *"
                        type="datetime-local"
                        invalidFeedback="Date is required!"
                        :isValid="checkIfValid('date')"
                        :value.sync="$v.form.date.$model"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                      <div class="form-group">
                        <label>VEHICLE *</label>
                        <v-select
                          :options="$store.state.property.property | propertyFilter"
                          placeholder="Nothing Selected"
                          class="style-chooser"
                          append-to-body
                          :calculate-position="withPopper"
                          style="width:100%;"
                          v-model="form.vehicle_id"
                          :isValid="checkIfValid('vehicle_id')"
                          :value.sync="$v.form.vehicle_id.$model"
                          :class="{ 'border-red': $v.form.vehicle_id.$anyError, 'border-green': $v.form.vehicle_id.required}"
                        >
                          <template #list-header>
                              <div v-if="form.customer_id" style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="addCarProperty(form.customer_id)"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'PROPERTY', customer_id:form.customer_id, modal_size:'md'}"><CIcon name="cil-trash"/> DELETE</a></li>
                              </div>
                          </template>
                        </v-select>
                        <div v-if="$v.form.vehicle_id.$anyError == true" class="invalid-feedback" style="display:block;">
                            Vehicle is required!
                        </div>
                      </div>
                    </CCol>
                    <CCol lg="6">
                      <div class="form-group">
                        <label>Insurance *</label>
                        <v-select
                          :options="$store.state.insurance.insurance | insuranceFilter"
                          placeholder="Nothing Selected"
                          class="style-chooser"
                          append-to-body
                          :calculate-position="withPopper"
                          style="width:100%;"
                          v-model="form.insurance"
                          :isValid="checkIfValid('insurance')"
                          :value.sync="$v.form.insurance.$model"
                          :class="{ 'border-red': $v.form.insurance.$anyError, 'border-green': $v.form.insurance.required}"
                        >
                        <template #list-header>
                            <div style="display:flex;">
                              <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddInsuranceData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                              <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'INSURANCE', modal_size:'lg'}"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                        </template>
                        </v-select>
                        <div v-if="$v.form.insurance.$anyError == true" class="invalid-feedback" style="display:block;">
                            Vehicle is required!
                        </div>
                      </div>
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
                                v-on:child_delete_services="deleteModal"
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
                <CCol lg="6" v-for="(docs, index) in form.documents" :key="index">
                  <Documents
                  :documents="docs"
                  v-on:pass_files="passFiles"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="12">
                  <CButton @click="submit_draft" color="success">SAVE AS DRAFT</CButton>
                  <!-- <CButton @click="submit_approval" class="ml-2" color="success">SAVE & SEND</CButton> -->
                 
                </CCol>
              </CRow>
            </CCardBody>
        </CCard>
        <AddCustomerModal
        :showModalAddData="showModalAddData"
        />
        <AddServicesModal
        v-on:delete_modal="deleteModalShow"
        :AddServicesData="AddServicesData"
        />
        <AddSubServicesModal
        v-on:child_add_subservices="addSubServices"
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
        <ModalDelete
        :showModalDataDelete="showModalDataDelete"
        v-on:update_sub_services="updateSubServices"
        />
    </div>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import Services from './Services';
import AddCustomerModal from './AddCustomerModal';
import AddServicesModal from './AddServicesModal';
import AddSubServicesModal from './AddSubServicesModal';
import AddCarPropertyModal from './AddCarPropertyModal';
import SubmitApprovalModal from './SubmitApprovalModal';
import AddInsuranceModal from './AddInsuranceModal';
import Documents from './Documents';
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
import ModalDelete from '../../DeleteModal/View';

export default {
    data(){
      return {
        showModalAddData: '',
        AddServicesData: '',
        AddSubServicesData: '',
        AddSaveAndSendData: '',
        AddCarPropertyData: '',
        AddInsuranceData: '',
        showModalDataDelete: '',
        placement: 'bottom',
        form: {
          customer_id: '',
          address: '',
          date: '',
          insurance: '',
          insurance_type: '',
          vehicle_id: '',
          services: [
            {
            services_id: '',
            labor_fee: 0,
            parts_fee: 0,
            sub_services: []
            }
          ],
          documents: []
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
        Documents,
        ModalDelete
    },
    mixins: [validationMixin],
    validations() {
        return {
          form: {
             customer_id: {
              required
            },
            date: {
              required
            },
            insurance: {
              required
            },
            vehicle_id: {
              required
            },
          }
        };
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
                option.push({label: item.insurance_name, insurance_type:item.insurance_type, value: item.id, email: item.email, phone: item.phone, contact_person: item.contact_person})
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
        this.form.vehicle_id = '';
        this.$store.dispatch('property/emptyProperty');
        this.$store.dispatch('property/findProperty', newVal.value);
      },
      insurance(newVal){
        console.log(newVal.insurance_type);
        if(newVal.insurance_type == 'Private Insurance'){
          this.form.documents = [
            {
              document_name: 'Vehicle OR/CR',
              files: '',
              prefix: 'VOC'
            },
            {
              document_name: 'Driver’s License w/OR',
              files: '',
              prefix: 'DL'
            },
            {
              document_name: 'Police Report/Affidavit of Accident',
              files: '',
              prefix: 'PR'
            },
            {
              document_name: 'Comprehensive Insurance Policy',
              files: '',
              prefix: 'CIP'
            },
            {
              document_name: 'Pictures',
              files: [],
              prefix: 'P'
            },
          ]
        }else if(newVal.insurance_type == 'Third Party Claim'){
          this.form.documents = [
            {
              document_name: 'Vehicle OR/CR',
              files: '',
              prefix: 'VOC'
            },
            {
              document_name: 'Driver’s License w/OR',
              files: '',
              prefix: 'DL'
            },
            {
              document_name: 'Police Report/Affidavit of Accident',
              files: '',
              prefix: 'PR'
            },
            {
              document_name: 'Comprehensive Insurance Policy',
              files: '',
              prefix: 'CIP'
            },
            {
              document_name: 'Pictures',
              files: [],
              prefix: 'P'
            },
            {
              document_name: 'Certificate of No Claim',
              files: '',
              prefix: 'CONC'
            },
          ]
        }else if(newVal.insurance_type == 'GSIS'){
          this.form.documents = [
            {
              document_name: 'Vehicle OR/CR',
              files: '',
              prefix: 'VOR'
            },
            {
              document_name: 'Driver’s License w/OR',
              files: '',
              prefix: 'DL'
            },
            {
              document_name: 'Police Report/Affidavit of Accident',
              files: '',
              prefix: 'PR'
            },
            {
              document_name: 'Comprehensive Insurance Policy',
              files: '',
              prefix: 'CIP'
            },
            {
              document_name: 'Pictures',
              files: [],
              prefix: 'P'
            },
            {
              document_name: 'Trip Ticket',
              files: '',
              prefix: 'TT'
            },
            {
              document_name: 'Authorization Letter with Letterhead for government agencies',
              files: '',
              prefix: 'ALG'
            },
            {
              document_name: 'Authorization Letter for individual',
              files: '',
              prefix: 'ALI'
            },
          ]
        }else if(newVal.insurance_type == 'Bidding'){
          this.form.documents = [
            {
              document_name: 'Request for Quotation',
              files: '',
              prefix: 'RFQ'
            },
            {
              document_name: 'Mayor’s Permit',
              files: '',
              prefix: 'MP'
            },
            {
              document_name: 'PHILGEPS',
              files: '',
              prefix: 'PS'
            },
            {
              document_name: 'Omnibus Sworn Statement',
              files: '',
              prefix: 'OSS'
            },
            {
              document_name: 'Tax Clearance/ITR',
              files: '',
              prefix: 'TC'
            },
          ]
        }
      },
    },
    computed:{
      isValid () { return !this.$v.form.$invalid },
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
      updateSubServices(data){
        const services = [];
        this.form.services.forEach(item => {
          if(item.services_id == data.services_id){
            let sub = [];
            item.sub_services.forEach(item2 => {
              let items = item2.sub_services.filter(item => item.id != data.id);
              
              sub.push({
                id: item2.id,
                labor_fee: item2.labor_fee,
                parts_fee: item2.parts_fee,
                services_id: item2.services_id,
                sub_services: items
              });
            })
            services.push({
              labor_fee: item.labor_fee,
              parts_fee: item.parts_fee,
              services_id: item.services_id,
              sub_services: sub
            });
          }else{
            services.push(item)
          }
        })
        this.form.services = services;
      },
      checkIfValid (fieldName) {
          const field = this.$v.form[fieldName]
          if (!field.$dirty) {
              return null
          }
          return !(field.$invalid || field.$model === '')
      },
      deleteModalShow(data){
        this.showModalDataDelete = data;
      },
      deleteModal(data){
          this.showModalDataDelete = data;
      },
      validate () {
          this.$v.form.$touch()
      },
      addCarProperty(data){
        this.AddCarPropertyData = {
          trigger: new Date(),
          data: data
        }
      },
      submit_draft(){
        this.validate();
        if (this.isValid) {
          let formData = new FormData();
          formData.append('status', 'Draft');
          formData.append('customer_id', this.form.customer_id.value);
          formData.append('date', this.$root.momentFormatDateTimeConvert(this.form.date));
          formData.append('insurance', this.form.insurance.value);
          formData.append('vehicle_id', this.form.vehicle_id.value);
          var services = JSON.stringify(this.form.services);
          formData.append('services', services);
          var documents = JSON.stringify(this.form.documents);
          formData.append('documents', documents);
          this.form.documents.forEach(item => {
            console.log(item.files);
          formData.append('files[]', item.files);
            if(item.prefix == 'P'){
              Array.from(item.files).forEach(pic => {
                console.log(pic);
                formData.append('pic[]', pic);
              });
            }
          });

          formData.append('user_id', this.$store.getters['auth/user'].id);
          console.log(formData);
          const config = {
                  headers: { 'content-type': 'multipart/form-data' }
          }
          const params = {
              formData: formData,
              config: config,
          }
          this.$store.dispatch('estimate/addEstimate', params).then(() => {
              this.$router.replace({
                name: "Estimates"
              });
          });
        }
        
      },
      submit_approval(){
        this.validate();
        if (this.isValid) {

          this.AddSaveAndSendData = {
            trigger: new Date(),
            data: this.form
          }
        }
      },
     
      child_action(data, event){
        if(event == 'add'){
            this.form.services.push({
              id: '',
              estimated_id: '', 
              labor_fee: 0,
              parts_fee: 0,
              services_id: '',
              sub_services: []
            })
        }else{
          if(this.form.services.length != 1){
            this.form.services.splice(this.form.services.indexOf(data), 1);
          }
        }
      },
      passFiles(docName, prefix, files){
        const index = this.form.documents.findIndex(item => item.document_name === docName);
        if(index !== -1){
          this.form.documents.splice(index, 1, {
            document_name: docName,
            files: files,
            prefix: prefix
          });
        }
      },
      childSubChanges(data){
        console.log(data);
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
      addSubServices(data){
        const services = [];
        this.form.services.forEach(item => {
          if(item.services_id == data.services_id){
            let sub = [];
            item.sub_services.forEach(item2 => {
              let mrge = item2.sub_services.concat(data);
              sub.push({
                id: item2.id,
                labor_fee: item2.labor_fee,
                parts_fee: item2.parts_fee,
                services_id: item2.services_id,
                sub_services: mrge
              });
            })
            services.push({
              labor_fee: item.labor_fee,
              parts_fee: item.parts_fee,
              services_id: item.services_id,
              sub_services: sub
            });
          }else{
            services.push(item)
          }
        })
        this.form.services = services;

      },
      openAddServices(){
        this.AddServicesData = new Date();
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
      this.$store.dispatch('estimate/fetchEstimateCount');
    },
    multiselectOptions: [
        { value: 'AL', label: 'PARTS TO BE REPLACE' },
        { value: 'AK', label: 'PULLDOWN ALL NEC. PARTS TO GIVEWAY FOR REPAIR' },
        { value: 'AK', label: 'TINSMITH JOB' },
        { value: 'AK', label: 'PAINTING JOB' },
        { value: 'AK', label: 'PAINT MATERIALS' },
    ],
}
</script>
<style>
.inline {
    display:flex;
}
</style>
