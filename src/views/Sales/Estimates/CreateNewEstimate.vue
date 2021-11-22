<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>Request Job Estimate</strong>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                      <div class="inline">
                          <v-select
                            :options="$store.state.customer.customer | customerFilter"
                            placeholder="Select Customer"
                            class="style-chooser"
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
                            <li style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalAddData = new Date()">ADD CUSTOMER</a></li>
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
                        >
                        <template #list-header>
                            <li v-if="form.customer_id" style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="addCarProperty(form.customer_id)">ADD CAR PROPERTY</a></li>
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
                        >
                        <template #list-header>
                            <li style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddInsuranceData = new Date()">ADD INSURANCE</a></li>
                        </template>
                        </v-select>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="6">
                        <CInput v-if="$store.state.estimate.estimate" readonly :placeholder="'EST-000' + ($store.state.estimate.estimate.at(-1).id+1)"/>
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
              <CRow>
                <CCol lg="12" align="center">
                  <hr>
                  <h4>Document's Verification</h4>
                </CCol>
                <CCol lg="6" v-show="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Vehicle OR/CR"
                    @change="uploadVehicleORCR"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Driver’s License w/OR"
                    @change="uploadDriversLicense"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Police Report/Affidavit of Accident"
                    @change="uploadPoliceReport"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Comprehensive Insurance Policy"
                    @change="uploadComprehensiveInsurancePolicy"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Private Insurance' || form.insurance_type == 'Third Party Claim' || form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Pictures"
                    @change="uploadPictures"
                    multiple
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Third Party Claim'">
                  <CInputFile
                    label="Certificate of No Claim"
                    @change="uploadCertificateOfClaim"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Trip Ticket"
                    @change="uploadTripTicket"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Authorization Letter with Letterhead for government agencies"
                    @change="uploadAuthorizationLetterForGovernment"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'GSIS'">
                  <CInputFile
                    label="Authorization Letter for individual"
                    @change="uploadAuthorizationLetterForIndividual"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Request for Quotation"
                    @change="uploadRequestForQuotation"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Mayor’s Permit"
                    @change="uploadMayorsPermit"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="PHILGEPS"
                    @change="uploadPhilgeps"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Omnibus Sworn Statement"
                    @change="uploadOmnibus"
                  />
                </CCol>
                <CCol lg="6" v-if="form.insurance_type == 'Bidding'">
                  <CInputFile
                    label="Tax Clearance/ITR"
                    @change="uploadTaxClearance"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol lg="12">
                  <CButton @click="submit_draft" color="success">SAVE AS DRAFT</CButton>
                  <CButton @click="submit_approval" class="ml-2" color="success">SAVE & SEND</CButton>
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
import Services from './Services';
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
        form: {
          customer_id: '',
          address: '',
          date: '',
          insurance: '',
          insurance_type: '',
          estimate_date: '',
          vehicle_id: '',
          services: [
            {
            id: '',
            labor_fee: 0,
            parts_fee: 0,
            sub_services: []
            }
          ],
          documents: {
            vehicle_or_cr: '',
            drivers_license_or: '',
            police_report_affidavit_accident: '',
            comprehensive_insurance: '',
            pictures: '',
            certificate_of_claim: '',
            trip_ticket: '',
            authorization_letter_for_government: '',
            authorization_letter_for_individual: '',
            request_for_qoutation: '',
            mayors_permit: '',
            philgeps: '',
            omnibus: '',
            tax_clearance: ''
          }
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
        AddInsuranceModal
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
        this.form.vehicle_id = '';
        this.$store.dispatch('property/emptyProperty');
        this.$store.dispatch('property/findProperty', newVal.value);
      },
      insurance(newVal){
        if(newVal){
          this.form.insurance_type = newVal.insurance_type;
        }else{
          this.form.insurance_type = '';
        }
        
      }
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
      submit_draft(){
        let formData = new FormData();
        // documents
        formData.append('vehicle_or_cr', this.form.documents.vehicle_or_cr);
        formData.append('drivers_license_or', this.form.documents.drivers_license_or);
        formData.append('police_report_affidavit_accident', this.form.documents.police_report_affidavit_accident);
        formData.append('comprehensive_insurance', this.form.documents.comprehensive_insurance);
        formData.append('pictures', this.form.documents.pictures);
        formData.append('certificate_of_claim', this.form.documents.certificate_of_claim);
        formData.append('trip_ticket', this.form.documents.trip_ticket);
        formData.append('authorization_letter_for_government', this.form.documents.authorization_letter_for_government);
        formData.append('authorization_letter_for_individual', this.form.documents.authorization_letter_for_individual);
        formData.append('request_for_qoutation', this.form.documents.request_for_qoutation);
        formData.append('mayors_permit', this.form.documents.mayors_permit);
        formData.append('philgeps', this.form.documents.philgeps);
        formData.append('omnibus', this.form.documents.omnibus);
        formData.append('tax_clearance', this.form.documents.tax_clearance);
        formData.append('status', 'draft');

        formData.append('customer_id', this.form.customer_id.value);
        formData.append('date', this.form.date);
        formData.append('insurance', this.form.insurance.value);
        formData.append('vehicle_id', this.form.vehicle_id.value);

        var services = JSON.stringify(this.form.services);
        formData.append('services', services);

        formData.append('user_id', this.$store.getters['auth/user'].id);

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
      },
      submit_approval(){
        let formData = new FormData();
        // documents
        formData.append('vehicle_or_cr', this.form.documents.vehicle_or_cr);
        formData.append('drivers_license_or', this.form.documents.drivers_license_or);
        formData.append('police_report_affidavit_accident', this.form.documents.police_report_affidavit_accident);
        formData.append('comprehensive_insurance', this.form.documents.comprehensive_insurance);
        formData.append('pictures', this.form.documents.pictures);
        formData.append('certificate_of_claim', this.form.documents.certificate_of_claim);
        formData.append('trip_ticket', this.form.documents.trip_ticket);
        formData.append('authorization_letter_for_government', this.form.documents.authorization_letter_for_government);
        formData.append('authorization_letter_for_individual', this.form.documents.authorization_letter_for_individual);
        formData.append('request_for_qoutation', this.form.documents.request_for_qoutation);
        formData.append('mayors_permit', this.form.documents.mayors_permit);
        formData.append('philgeps', this.form.documents.philgeps);
        formData.append('omnibus', this.form.documents.omnibus);
        formData.append('tax_clearance', this.form.documents.tax_clearance);
        formData.append('status', 'draft');

        formData.append('customer_id', this.form.customer_id.value);
        formData.append('date', this.form.date);
        formData.append('insurance_type_id', this.form.insurance_type);
        formData.append('insurance', this.form.insurance);
        formData.append('vehicle_id', this.form.vehicle_id.value);

        var services = JSON.stringify(this.form.services);
        formData.append('services', services);

        formData.append('user_id', this.$store.getters['auth/user'].id);

        const config = {
                headers: { 'content-type': 'multipart/form-data' }
        }
        const params = {
            formData: formData,
            config: config,
        }

        this.AddSaveAndSendData = {
          trigger: new Date(),
          params: params,
          data: this.form
        }
      },
      uploadVehicleORCR(files){
          this.form.documents.vehicle_or_cr = files[0];
      },
      uploadDriversLicense(files){
        this.form.documents.drivers_license_or = files[0];
      },
      uploadPoliceReport(files){
        this.form.documents.police_report_affidavit_accident = files[0];
      },
      uploadComprehensiveInsurancePolicy(files){
        this.form.documents.comprehensive_insurance = files[0];
      },
      uploadPictures(files){
        this.form.documents.pictures = files[0];
      },
      uploadCertificateOfClaim(files){
        this.form.documents.certificate_of_claim = files[0];
      },
      uploadTripTicket(files){
        this.form.documents.trip_ticket = files[0];
      },
      uploadAuthorizationLetterForGovernment(files){
        this.form.documents.authorization_letter_for_government = files[0];
      },
      uploadAuthorizationLetterForIndividual(files){
        this.form.documents.authorization_letter_for_individual = files[0];
      },
      uploadRequestForQuotation(files){
        this.form.documents.request_for_qoutation = files[0];
      },
      uploadMayorsPermit(files){
        this.form.documents.mayors_permit = files[0];
      },
      uploadPhilgeps(files){
        this.form.documents.philgeps = files[0];
      },
      uploadOmnibus(files){
        this.form.documents.omnibus = files[0];
      },
      uploadTaxClearance(files){
        this.form.documents.tax_clearance = files[0];
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
