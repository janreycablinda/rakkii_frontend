<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            ADD CONTRACTS
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <ContractTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import ContractTable from './ContractTable';
export default {
    components: {
        ContractTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>