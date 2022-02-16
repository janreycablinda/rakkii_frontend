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
                        Documents
                    </CCardHeader>
                    <CCardBody>
                        <!-- <CTabs> -->
                            <!-- <CTab title="Documents" active> -->
                                <DocumentsTable
                                :items="documents"
                                />
                            <!-- </CTab> -->
                            <!-- <CTab title="LOA Documents">
                                <LoaDocumentsTable
                                :items="loa_documents"
                                />
                            </CTab> -->
                        <!-- </CTabs> -->
                          <!-- <TransactionHistory
                          :items="$store.state.job_orders.job_orders_status"
                          /> -->
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
import DocumentsTable from './DocumentsTable'
import LoaDocumentsTable from './LoaDocumentsTable'
import Sidebar from './Sidebar'

export default {
    components: {
        DocumentsTable,
        LoaDocumentsTable,
        Sidebar
    },
    data(){
        return {
            documents: [],
            loa_documents: []
        }
    },
    methods: {
        
    },
    created(){
        console.log(this.$route.params.id);
        this.$store.dispatch('document/findDocuments', this.$route.params.id).then(response => {
            console.log(response);
            this.documents = response;
        });
        // this.$store.dispatch('document/findLoaDocuments', this.$route.params.id).then(response => {
        //     console.log(response);
        //     this.loa_documents = response;
        // });
        
        // const params = {
        //     id: this.$route.params.id,
        //     property_id: this.vehicle_owned,
        //     status: this.status
        // }

        // this.$store.dispatch('job_orders/findJobOrderStatus', params);
        // this.$store.dispatch('property/findProperty', this.$route.params.id);
        
    },
}
</script>