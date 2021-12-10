<template>
    <div>
        <CRow>
            <CCol :lg="colSize">
                <CCard>
                    <CCardHeader>
                        <CButton to="/sales/estimates/create-estimate" size="sm" color="primary">
                            CREATE NEW ESTIMATE
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <EstimateTable
                        :items="$store.state.estimate.estimate"
                        v-on:event_child="eventChild"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol v-if="info" :lg="colSize">
                <CCard>
                    <CCardHeader>
                        <CButton @click="info = ''; colSize = 12" size="sm" color="secondary">
                            <span><CIcon name="cil-caret-left"/></span>
                        </CButton>&nbsp;
                        <CBadge :color="getBadge(info.status)" class="my-0 p-2 capetalize">{{info.status}}</CBadge>
                        <div class="card-header-actions">
                            <CButton @click="deleteEstimate(info)" size="sm" color="danger" style="position:absolute; top:10px; right:362px;">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton :to="'/sales/estimates/edit-estimate/' + info.id" size="sm" color="secondary" style="position:absolute; top:10px; right:322px;">
                                <CIcon name="cil-pen" />
                            </CButton>
                            <!-- <CButton size="sm" color="secondary" style="position:absolute; top:10px; right:272px;">
                                <CIcon name="cib-adobe-acrobat-reader" />
                            </CButton> -->
                            <CDropdown
                                color="secondary"
                                size="sm"
                                style="position:absolute; top:10px; right:272px;"
                            >
                                <template #toggler-content>
                                    <CIcon name="cib-adobe-acrobat-reader" />
                                </template>
                                <CDropdownItem @click="downloadPdf">Download</CDropdownItem>
                                <CDropdownItem @click="print">Print</CDropdownItem>
                            </CDropdown>
                            <CButton size="sm" @click="showMail" color="secondary" style="position:absolute; top:10px; right:232px;">
                                <CIcon name="cil-envelope-closed" />
                            </CButton>
                            <CDropdown
                                class="m-2"
                                color="secondary"
                                size="sm"
                                style="position:absolute; top:5px; right:160px;"
                            >
                                <template #toggler-content>
                                    <span class="my-2 ">More</span>
                                </template>
                                <CDropdownItem @click="changeStatus(info.id, 'sent')">Mark as Sent</CDropdownItem>
                                <CDropdownItem @click="changeStatus(info.id, 'draft')">Mark as Draft</CDropdownItem>
                                <CDropdownItem @click="changeStatus(info.id, 'disapproved')">Mark as Disapproved</CDropdownItem>
                                <CDropdownItem @click="changeStatus(info.id, 'approved')">Mark as Approved</CDropdownItem>
                            </CDropdown>
                            <CDropdown 
                                toggler-text="Convert To Job Order" 
                                class="m-2"
                                color="primary"
                                size="sm"
                                style="position:absolute; top:5px; right:10px;"
                            >
                                <CDropdownItem>Convert and Save as Draft</CDropdownItem>
                                <CDropdownItem>Convert and Save as Approved</CDropdownItem>
                                <CDropdownItem>Convert and Adjust Estimate</CDropdownItem>
                                <CDropdownDivider/>
                                <CDropdownItem @click="covert(info)">Convert</CDropdownItem>
                            </CDropdown>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTabs>
                            <CTab title="Estimate" active>
                                <CRow class="mt-4">
                                    <CCol lg="6">
                                        <CLink :to="'/sales/estimates/edit-estimate/' + info.id"><h4>EST-000{{info.estimate_no}}</h4></CLink>
                                    </CCol>
                                    <CCol lg="6" align="right">
                                         <span>Estimate Date: {{info.date}}</span><br>
                                         <span>Insurance: {{info.insurance.insurance_name}}</span>
                                    </CCol>
                                </CRow>
                                <CRow class="mt-4">
                                    <CCol lg="12">
                                        <table class="custom-table">
                                            <tr>
                                                <th width="80%">
                                                    SCOPE OF WORK
                                                </th>
                                                <th width="10%">
                                                    LABOR
                                                </th>
                                                <th width="10%">
                                                    PARTS
                                                </th>
                                            </tr>
                                            <tr v-for="services in info.scope" :key="services.id">
                                                <td>
                                                    {{services.services.services_name}}
                                                    <ul class="custom-ul" v-for="sub in services.sub_services" :key="sub.id">
                                                        <li>{{sub.sub_services.services_name}}</li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    ₱{{services.labor_fee}}
                                                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                                                        <li style="!important; list-style-type: none;">₱{{sub.labor_fee}}</li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    ₱{{services.labor_fee}}
                                                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                                                        <li style="list-style-type: none;">₱{{sub.parts_fee}}</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    SUB-TOTAL:
                                                </td>
                                                <td class="bordered-top border-left">
                                                    ₱{{sub_total_labor}}
                                                </td>
                                                <td class="bordered-top border-left">
                                                    ₱{{sub_total_parts}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right">
                                                    12% VAT:
                                                </td>
                                                <td class="bordered-top border-left">
                                                    ₱{{total_vat}}
                                                </td>
                                                <td class="bordered-top border-left">
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="bordered-top">
                                                    <strong>TOTAL LABOR AND PARTS</strong>
                                                </td>
                                                <td colspan="2" class="bordered-top border-left">
                                                    <strong>₱{{total_labor_parts}}</strong>
                                                </td>
                                                
                                            </tr>
                                        </table>
                                    </CCol>
                                </CRow>
                            </CTab>
                            <CTab title="Documents">
                                <DocumentsTable
                                :items="info.documents"
                                />
                            </CTab>
                            <CTab>
                                <template #title>
                                    LOA <CBadge color="danger">{{info.loa_documents.length}}</CBadge>
                                </template>
                                <LoaDocumentTable
                                :items="info.loa_documents"
                                />
                                <!-- <DocumentsTable
                                :items="info.documents"
                                /> -->
                            </CTab>
                            <!-- <CTab title="Reminders">
                                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.
                            </CTab> -->
                            <CTab title="Activity Log">
                                <simple-timeline :items='activity_log'></simple-timeline>
                            </CTab>
                            <CTab title="Mail">
                                <h4>No tracked emails sent</h4>
                            </CTab>
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="12">
                <div id="printMe" style="margin-bottom:250px; display:none;">
                    <img style="padding-left:40px;" width="100%" src="/img/upload/HEADER.png">
                    <div style="text-align:right; margin-top:-70px; margin-right:150px;">
                        <p style="margin:0; ">(02) 796 5092 <CIcon style="width:17px;" color="#F7931E" name="cil-phone"/></p>
                        <p style="margin:0;">rakkiiautoservices@yahoo.com <CIcon style="width:17px;" color="#F7931E" name="cib-gmail"/></p>
                        <p style="margin:0;">71 Santol St.Niño, Quezon City, 1113 <CIcon style="width:17px;" color="#F7931E" name="cil-location-pin"/></p>
                    </div>
                    <div style="padding-left:50px; padding-right:50px; margin-top:80px;">
                        <table style="border:1px #000 solid;" width="100%" v-if="info">
                            <tr style="border:1px #000 solid;">
                                <th colspan="4" style="text-align:center;">
                                    <h5>REPAIR JOB ESTIMATE</h5>
                                </th>
                            </tr>
                            <tr>
                                <th width="15%" style="border:1px #000 solid;">
                                    <h5>Customer:</h5>
                                </th>
                                <th width="55%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.customer.company_name}}</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    <h5>Date:</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.date}}</h5>
                                </th>
                            </tr>
                            <tr>
                                <th width="15%" style="border:1px #000 solid;">
                                    <h5>Address:</h5>
                                </th>
                                <th width="55%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.customer.address}}</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    
                                </th>
                            </tr>
                            <tr>
                                <th width="15%" style="border:1px #000 solid;">
                                    <h5>Insurance:</h5>
                                </th>
                                <th width="55%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.insurance.insurance_name}}</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    
                                </th>
                            </tr>
                            <tr>
                                <th width="20%" style="border:1px #000 solid;">
                                    <h5>Vehicle:</h5>
                                </th>
                                <th width="50%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.property.vehicle.vehicle_name}}</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid;">
                                    <h5>PLATE NO.:</h5>
                                </th>
                                <th width="10%" style="border:1px #000 solid; text-align:center;">
                                    <h5>{{info.property.plate_no}}</h5>
                                </th>
                            </tr>
                            <tr style="border:1px #000 solid;">
                                <th colspan="4">
                                    &nbsp;
                                </th>
                            </tr>
                            <tr style="border:1px #000 solid;">
                                <th colspan="2" style="text-align:center;">
                                    <h5>SCOPE OF WORK</h5>
                                </th>
                                <th style="border:1px #000 solid; text-align:center;">
                                    <h5>LABOR</h5>
                                </th>
                                <th style=" border:1px #000 solid;text-align:center;">
                                    LABOR
                                </th>
                            </tr>
                            <tr v-for="(services, index) in info.scope" :key="services.id">
                                <th colspan="2">
                                    <h5>{{toRoman(index+1)}} - {{services.services.services_name}}</h5>
                                    <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                        <li><h5>{{sub_services.sub_services.services_name}}</h5></li>
                                    </ul>
                                </th>
                                <th style="border-left:1px #000 solid;">
                                    <h5 style="text-align:center;">₱{{services.labor_fee}}</h5>
                                    <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                        <li><h5>₱{{sub_services.labor_fee}}</h5></li>
                                    </ul>
                                </th>
                                <th style="border-left:1px #000 solid;">
                                    <h5 style="text-align:center;">₱{{services.parts_fee}}</h5>
                                    <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                        <li><h5>₱{{sub_services.parts_fee}}</h5></li>
                                    </ul>
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:right;">
                                    &nbsp;
                                </th>
                                <th style="text-align:right;">
                                    <h5>SUB-TOTAL:</h5>
                                </th>
                                <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                    <h5>₱{{sub_total_labor}}</h5>
                                </th>
                                <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                    <h5>₱{{sub_total_parts}}</h5>
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:right;" colspan="2">
                                    <h5>12% VAT:</h5>
                                </th>
                                <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                    <h5>₱{{total_vat}}</h5>
                                </th>
                                <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                    
                                </th>
                            </tr>
                            <tr>
                                <th style="border-top:1px #000 solid; text-align:center;" colspan="2">
                                    <div style="display:flex; justify-content:space-between;">
                                    <h5 style="margin-left:160px;">TOTAL LABOR AND PARTS</h5>
                                    <h5 style="margin-right:30px;">₱{{total_labor_parts}}</h5>
                                    </div>
                                </th>
                                <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                    <div style="height:30px;"></div>
                                    <h5>FRED MORAN</h5>
                                </th>
                            </tr>
                            <tr>
                                <th rowspan="2" style="border-top:1px #000 solid;" colspan="2">
                                   <h5>The above ESTIMATE is based on our inspection and does not cover/include broken or additional labor which are not evident on the first inspection. Qoutation and parts/labor are current and subject to change notice. This estimate is only good for fifteen days, and is NOT VALID FOR COURT PURPOSES. RAKKII AUTO SERVICE shall not be liable for loss/es or any damage/s to vehicle or any</h5>
                                </th>
                                <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                    <div style="height:30px;"></div>
                                    <h5>APPROVED BY</h5>
                                    <h5>REZZA LYNN BITENG</h5>
                                </th>
                            </tr>
                            <tr>
                                <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                    <h5>GENERAL MANAGER</h5>
                                </th>
                            </tr>
                        </table>
                    </div>
                </div>
            </CCol>
        </CRow>
        <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1344"
        :filename="'EST-000' +info.estimate_no"
        :pdf-quality="1"
        :manual-pagination="false"
        pdf-format="legal"
        pdf-orientation="portrait"
        pdf-content-width="816px"
        ref="html2Pdf"
        >
        <section slot="pdf-content">
          <div>
                <img style="padding-left:20px;" width="100%" src="/img/upload/HEADER.png">
                <div style="text-align:right; margin-top:-60px; margin-right:110px;">
                    <p style="margin:0; ">(02) 796 5092 <CIcon style="width:17px;" color="#F7931E" name="cil-phone"/></p>
                    <p style="margin:0;">rakkiiautoservices@yahoo.com <CIcon style="width:17px;" color="#F7931E" name="cib-gmail"/></p>
                    <p style="margin:0;">71 Santol St.Niño, Quezon City, 1113 <CIcon style="width:17px;" color="#F7931E" name="cil-location-pin"/></p>
                </div>
                <div style="padding-left:20px; padding-right:20px; margin-top:80px;">
                    <table style="border:1px #000 solid;" width="100%" v-if="info">
                        <tr style="border:1px #000 solid;">
                            <th colspan="4" style="text-align:center;">
                                <h5>REPAIR JOB ESTIMATE</h5>
                            </th>
                        </tr>
                        <tr>
                            <th width="15%" style="border:1px #000 solid;">
                                <h6>Customer:</h6>
                            </th>
                            <th width="55%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.customer.company_name}}</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                <h6>Date:</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.date}}</h6>
                            </th>
                        </tr>
                        <tr>
                            <th width="15%" style="border:1px #000 solid;">
                                <h6>Address:</h6>
                            </th>
                            <th width="55%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.customer.address}}</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                
                            </th>
                        </tr>
                        <tr>
                            <th width="15%" style="border:1px #000 solid;">
                                <h6>Insurance:</h6>
                            </th>
                            <th width="55%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.insurance.insurance_name}}</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                
                            </th>
                        </tr>
                        <tr>
                            <th width="20%" style="border:1px #000 solid;">
                                <h6>Vehicle:</h6>
                            </th>
                            <th width="50%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.property.vehicle.vehicle_name}}</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid;">
                                <h6>PLATE NO.:</h6>
                            </th>
                            <th width="10%" style="border:1px #000 solid; text-align:center;">
                                <h6>{{info.property.plate_no}}</h6>
                            </th>
                        </tr>
                        <tr style="border:1px #000 solid;">
                            <th colspan="4">
                                &nbsp;
                            </th>
                        </tr>
                        <tr style="border:1px #000 solid;">
                            <th colspan="2" style="text-align:center;">
                                <h6>SCOPE OF WORK</h6>
                            </th>
                            <th style="border:1px #000 solid; text-align:center;">
                                <h6>LABOR</h6>
                            </th>
                            <th style=" border:1px #000 solid;text-align:center;">
                                LABOR
                            </th>
                        </tr>
                        <tr v-for="(services, index) in info.scope" :key="services.id">
                            <th colspan="2">
                                <h6>{{toRoman(index+1)}} - {{services.services.services_name}}</h6>
                                <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                    <li><h6>{{sub_services.sub_services.services_name}}</h6></li>
                                </ul>
                            </th>
                            <th style="border-left:1px #000 solid;">
                                <h6 style="text-align:center;">₱{{services.labor_fee}}</h6>
                                <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                    <li><h6>₱{{sub_services.labor_fee}}</h6></li>
                                </ul>
                            </th>
                            <th style="border-left:1px #000 solid;">
                                <h6 style="text-align:center;">₱{{services.parts_fee}}</h6>
                                <ul style="list-style-type: none; margin:0;" v-for="sub_services in services.sub_services" :key="sub_services.id">
                                    <li><h6>₱{{sub_services.parts_fee}}</h6></li>
                                </ul>
                            </th>
                        </tr>
                        <tr>
                            <th style="text-align:right;">
                                &nbsp;
                            </th>
                            <th style="text-align:right;">
                                <h6>SUB-TOTAL:</h6>
                            </th>
                            <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                <h6>₱{{sub_total_labor}}</h6>
                            </th>
                            <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                <h6>₱{{sub_total_parts}}</h6>
                            </th>
                        </tr>
                        <tr>
                            <th style="text-align:right;" colspan="2">
                                <h6>12% VAT:</h6>
                            </th>
                            <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                <h6>₱{{total_vat}}</h6>
                            </th>
                            <th style="border-top:1px #000 solid; border-left:1px #000 solid;">
                                
                            </th>
                        </tr>
                        <tr>
                            <th style="border-top:1px #000 solid; text-align:center;" colspan="2">
                                <div style="display:flex; justify-content:space-between;">
                                <h6 style="margin-left:160px;">TOTAL LABOR AND PARTS</h6>
                                <h6 style="margin-right:30px;">₱{{total_labor_parts}}</h6>
                                </div>
                            </th>
                            <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                <div style="height:30px;"></div>
                                <h6>FRED MORAN</h6>
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="border-top:1px #000 solid;" colspan="2">
                                <h6>The above ESTIMATE is based on our inspection and does not cover/include broken or additional labor which are not evident on the first inspection. Qoutation and parts/labor are current and subject to change notice. This estimate is only good for fifteen days, and is NOT VALID FOR COURT PURPOSES. RAKKII AUTO SERVICE shall not be liable for loss/es or any damage/s to vehicle or any</h6>
                            </th>
                            <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                <div style="height:30px;"></div>
                                <h6>APPROVED BY</h6>
                                <h6>REZZA LYNN BITENG</h6>
                            </th>
                        </tr>
                        <tr>
                            <th colspan="2" style="border-top:1px #000 solid; border-left:1px #000 solid; text-align:center;">
                                <h6>GENERAL MANAGER</h6>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    </vue-html2pdf>
    <SubmitApprovalModal
    :AddSaveAndSendData="AddSaveAndSendData"
    />
    </div>
</template>
<script>
import EstimateTable from './EstimateTable';
import DocumentsTable from './DocumentsTable';
import VueHtml2pdf from 'vue-html2pdf'
import LoaDocumentTable from './LoaDocumentTable'
import SubmitApprovalModal from './SubmitApprovalModal'

export default {
    data(){
      return {
        colSize: '12',
        info: '',
        AddSaveAndSendData: '',
        items: [
            {
            tag: '2018-01-12',
            color: '#84C529',
            content: '<span class="timeline-time">1 week ago</span>',
            footer: '<span class="timeline-name">Janrey Cablinda</span> - Created the estimate',
            },
        ]
      }
    },
    components: {
        EstimateTable,
        DocumentsTable,
        VueHtml2pdf,
        LoaDocumentTable,
        SubmitApprovalModal
    },
    computed: {
        activity_log(){
            const log = [];
            if(this.info){
                this.info.activity_log.forEach(item => {
                    log.push({
                    tag: this.$root.momentFormatDateTime(item.created_at),
                    color: '#84C529',
                    content: '<span class="timeline-time">' + this.$root.momentParse(item.created_at) + '</span>',
                    footer: '<span class="timeline-name">' + item.user.name + '</span> - ' +item.activity,
                    });
                })
            }
            return log;
        },
        sub_total_labor(){
            let service_labor = 0;
            let sub_service_parts = 0
            this.info.scope.forEach(item => {
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
                this.info.scope.forEach(item => {
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
        eventChild(data){
            // this.property_data = data;
            // const params = {
            //     id: data.id
            // }
            // this.$store.dispatch('member/findProperty', params);
            this.info = data;
            this.colSize = 6;
        },
        print () {
            // Pass the element id here
            this.$htmlToPaper('printMe', { 
                windowTitle: 'RAKKII AUTO SERVICES',
            });
        },
        downloadPdf () {
            this.$refs.html2Pdf.generatePdf()
        },
        getBadge (status) {
        return status === 'approved' ? 'success'
            : status === 'draft' ? 'secondary'
            : status === 'sent' ? 'warning'
            : status === 'disapproved' ? 'danger' : 'primary'
        },
        toRoman(num){
        const units = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
        const tens = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
        let numArr = [];

        for (let i = 0; i < 99; i++) {
            numArr.push(i);
        }

        const roman = numArr.map(i => {
            if ((i + 1) % 10 == 0) return tens[(i + 1) / 10 - 1];
            else if (i < 10) return units[i];
            else return `${tens[Math.floor(i / 10) - 1]}${units[i.toString().split("")[1]]}`;
        });
        console.log(roman[num - 1]);
        return roman[num - 1];
        },
        changeStatus(id, status){
            const params = {
                id: id,
                status: status
            }
            this.$store.dispatch('estimate/updateStatusEstimate', params).then(() => {
                this.info.status = status;
            });
        },
        covert(data){
            console.log(data);
            this.$store.dispatch('estimate/convertEstimate', data).then(() => {
                this.info = '';
                this.colSize = 12;
            });
        },
        deleteEstimate(data){
            if (confirm('Are you sure you want to delete EST-000' + data.estimate_no +'?')) {
                this.$store.dispatch('estimate/deleteEstimate', data.id);
                this.info = '';
                this.colSize = 12;
            }
        },
        showMail(){
            this.AddSaveAndSendData = {
                trigger: new Date(),
                data: this.info
            }
        }
    },
    created(){
        this.$store.dispatch('estimate/fetchEstimate');
    }
}
</script>
<style>
.custom-ul{
    padding-left:20px !important;
    margin:0px !important;
}
.custom-ul2{
    padding-left:0px !important;
    margin:0px !important;
}
.border-left{
    border-color:#000 !important;
}
.timeline-time{
    font-weight:bold;
    color:#3C4B64 !important;
}
.timeline-name{
    font-weight:600;
    color:#3C4B64 !important;
}

</style>
