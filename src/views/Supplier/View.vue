<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton @click="AddSupplierData = new Date()" size="sm" color="primary">
                            ADD SUPPLIER
                        </CButton>&nbsp;
                        <!-- <CButton to="/customers/import-customers" size="sm" color="primary">
                            IMPORT CUSTOMERS
                        </CButton>&nbsp; -->
                        <!-- <CButton size="sm" color="primary">
                            CONTACTS
                        </CButton> -->
                    </CCardHeader>
                    <CCardBody>
                        <SupplierTable
                        :items="$store.state.supplier.supplier"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <AddSupplierModal
        :AddSupplierData="AddSupplierData"
        />
    </div>
</template>
<script>
import SupplierTable from './SupplierTable';
import AddSupplierModal from './AddSupplierModal';

export default {
    data() {
        return {
            AddSupplierData: '',
            sampleData: [{
                company_name: 'Janrey Cablinda',
                contact_no: '09351329247',
                address: 'Cagayan de Oro City',
                status: 'pending'
            }]
        }
    },
    components: {
        SupplierTable,
        AddSupplierModal
    },
    created(){
        this.$store.dispatch('supplier/fetchSupplier');
    }
}
</script>