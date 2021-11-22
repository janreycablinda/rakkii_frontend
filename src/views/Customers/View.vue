<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton @click="showModalAddData = new Date()" size="sm" color="primary">
                            ADD CUSTOMER
                        </CButton>&nbsp;
                        <!-- <CButton to="/customers/import-customers" size="sm" color="primary">
                            IMPORT CUSTOMERS
                        </CButton>&nbsp; -->
                        <!-- <CButton size="sm" color="primary">
                            CONTACTS
                        </CButton> -->
                    </CCardHeader>
                    <CCardBody>
                        Customers Summary
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
                            <!-- <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-success">Active Contacts</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-danger">Inactive Contacts</span>
                            </CCol> -->
                            <!-- <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span>Contacts Logged In Today</span>
                            </CCol> -->
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CustomersTable
                        :items="$store.state.customer.customer"
                        />
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
        <AddCustomerModal
        :showModalAddData="showModalAddData"
        />
    </div>
</template>
<script>
import CustomersTable from './CustomersTable';
import { mapGetters } from 'vuex';
import AddCustomerModal from '../Sales/Estimates/AddCustomerModal';

export default {
    data() {
        return {
            showModalAddData: '',
            sampleData: [{
                company_name: 'Janrey Cablinda',
                contact_no: '09351329247',
                address: 'Cagayan de Oro City',
                status: 'pending'
            }]
        }
    },
    components: {
        CustomersTable,
        AddCustomerModal
    },
    computed: {
        ...mapGetters({ 
            customers: "customer/customer",
        }),
    },
    created(){
        this.$store.dispatch('customer/fetchCustomer');
    }
}
</script>