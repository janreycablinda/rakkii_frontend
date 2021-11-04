<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            NEW TASK
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                         <CRow class="mt-2">
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span>Total Tasks</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-success">Inprogress Tasks</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-danger">Pending Tasks</span>
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
                        <ViewTable/>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import ViewTable from './ViewTable';
export default {
    components: {
        ViewTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>