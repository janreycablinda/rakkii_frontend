<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/sales/estimates/create-estimate" size="sm" color="primary">
                            CREATE NEW ESTIMATE
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <EstimateTable
                        :items="estimate_data"
                        />
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
    created(){
        console.log(this.$route);
    }
}
</script>
