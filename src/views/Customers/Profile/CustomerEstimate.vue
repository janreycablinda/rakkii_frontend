<template>
    <div>
        <CRow>
            <CCol lg="3">
                <!-- <CCard>
                    <CCardHeader borderColor="red">Sample Company</CCardHeader>
                </CCard> -->
                <Sidebar/>
            </CCol>
            <CCol lg="9">
                <CCard>
                    <CCardHeader>
                        Estimates
                    </CCardHeader>
                    <CCardBody>
                          <EstimateTable
                          :items="estimates"
                          />
                    </CCardBody>
                    <!-- <CCardFooter align="left">
                        <CButton color="primary">SAVE</CButton>
                    </CCardFooter> -->
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import EstimateTable from './EstimateTable'
import Sidebar from './Sidebar'

export default {
    components: {
        EstimateTable,
        Sidebar
    },
    data(){
        return {
           estimates: []
        }
    },
    methods: {
        
    },
    created(){

        this.$store.dispatch('estimate/findEstimateCustomer', this.$route.params.id).then(response => {
            console.log(response);
            this.estimates = response;
        });
        
        
    },
}
</script>