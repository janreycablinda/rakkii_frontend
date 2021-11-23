<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton @click="AddInsuranceData = new Date()" size="sm" color="primary">
                            ADD INSURANCE
                        </CButton>&nbsp;
                        <!-- <CButton to="/customers/import-customers" size="sm" color="primary">
                            IMPORT CUSTOMERS
                        </CButton>&nbsp; -->
                        <!-- <CButton size="sm" color="primary">
                            CONTACTS
                        </CButton> -->
                    </CCardHeader>
                    <CCardBody>
                        <!-- Customers Summary
                        <CRow class="mt-2">
                            <CCol lg="2" class="border-right">
                                <h3>{{$store.state.customer.customer.length}}</h3>
                                <span>Total Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>{{$store.state.customer.customer.length}}</h3>
                                <span class="text-success">Active Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>0</h3>
                                <span class="text-danger">Inactive Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-success">Active Contacts</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-danger">Inactive Contacts</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span>Contacts Logged In Today</span>
                            </CCol>
                        </CRow> -->
                        <InsuranceTable
                        :items="$store.state.insurance.insurance"
                        />
                    </CCardBody>
                    
                </CCard>
            </CCol>
        </CRow>
        <AddInsuranceModal
        :AddInsuranceData="AddInsuranceData"
        />
    </div>
</template>
<script>
import InsuranceTable from './InsuranceTable';
import AddInsuranceModal from '../Sales/Estimates/AddInsuranceModal';

export default {
    data() {
        return {
            AddInsuranceData: '',
            sampleData: [{
                company_name: 'Janrey Cablinda',
                contact_no: '09351329247',
                address: 'Cagayan de Oro City',
                status: 'pending'
            }]
        }
    },
    components: {
        InsuranceTable,
        AddInsuranceModal
    },
    created(){
        this.$store.dispatch('insurance/fetchInsurance');
    }
}
</script>