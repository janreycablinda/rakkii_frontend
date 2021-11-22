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
                        <div class="card-header-actions">
                            <CButton size="sm" color="secondary" style="position:absolute; top:10px; right:312px;">
                                <CIcon name="cil-pen" />
                            </CButton>
                            <CButton size="sm" color="secondary" style="position:absolute; top:10px; right:272px;">
                                <CIcon name="cib-adobe-acrobat-reader" />
                            </CButton>
                            <CButton size="sm" color="secondary" style="position:absolute; top:10px; right:232px;">
                                <CIcon name="cil-envelope-closed" />
                            </CButton>
                            <CDropdown
                                toggler-text="More" 
                                class="m-2"
                                color="secondary"
                                size="sm"
                                style="position:absolute; top:5px; right:160px;"
                            >
                                <CDropdownItem>Mark as Sent</CDropdownItem>
                                <CDropdownItem>Mark as Draft</CDropdownItem>
                                <CDropdownItem>Mark as Decline</CDropdownItem>
                                <CDropdownItem>Mark as Approved</CDropdownItem>
                            </CDropdown>
                            <CDropdown 
                                toggler-text="Convert To Job Order" 
                                class="m-2"
                                color="primary"
                                size="sm"
                                style="position:absolute; top:5px; right:10px;"
                            >
                                <CDropdownItem>Convert and Save as Draft</CDropdownItem>
                                <CDropdownItem>Convert and Adjust Estimate</CDropdownItem>
                                <CDropdownDivider/>
                                <CDropdownItem>Convert</CDropdownItem>
                            </CDropdown>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTabs>
                            <CTab title="Estimate" active>
                                <CRow class="mt-4">
                                    <CCol lg="6">
                                        <h4>EST-000{{info.id}}</h4>
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
                                                    ₱{{services.labor}}
                                                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                                                        <li style="!important; list-style-type: none;">₱{{sub.labor}}</li>
                                                    </ul>
                                                </td>
                                                <td>
                                                    ₱{{services.parts}}
                                                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                                                        <li style="list-style-type: none;">₱{{sub.parts}}</li>
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
                                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.
                            </CTab>
                            <CTab title="Reminders">
                                2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.
                            </CTab>
                            <CTab title="Activity Log">
                                3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.
                            </CTab>
                            <CTab title="Mail">
                                3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                officia deserunt mollit anim id est laborum.
                            </CTab>
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import EstimateTable from './EstimateTable';
export default {
    data(){
      return {
        colSize: '12',
        info: '',
        estimate_data: [{
          estimate_no: 1,
          total_labor_parts: 1000,
          total_vat: 100,
          date: '11/03/2021',
          customer: 'Jane Tablon',
          status: 'draft'
        }]
      }
    },
    components: {
        EstimateTable
    },
    computed: {
        sub_total_labor(){
            let service_labor = 0;
            let sub_service_parts = 0
            this.info.scope.forEach(item => {
            service_labor += parseInt(item.labor)
            item.sub_services.forEach(item_sub => {
                sub_service_parts += parseInt(item_sub.labor);
            })
            })
            return service_labor + sub_service_parts;
        },
        sub_total_parts(){
            let service_parts = 0;
            let sub_service_parts = 0
                this.info.scope.forEach(item => {
                service_parts += parseInt(item.parts)
                item.sub_services.forEach(item_sub => {
                    sub_service_parts += parseInt(item_sub.parts);
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
</style>
