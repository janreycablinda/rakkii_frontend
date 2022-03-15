<template>
    <div>
        <CMedia>
        <CRow>
            <CCol lg=12>
                <CCard>
                    <CCardHeader>
                        <CIcon style="margin-top:-5px;" name="cil-balance-scale"/> <strong>Reports</strong>
                        <CRow>
                            <CCol lg="4">
                                <CListGroup accent>
                                    <!-- <CListGroupItem href="#" color="dark" accent="dark">Invoices Report</CListGroupItem>
                                    <CListGroupItem href="#" color="dark" accent="dark">Items Report</CListGroupItem> -->
                                    <CListGroupItem href="/report/collected" color="primary" accent="dark">Projects Report</CListGroupItem>
                                    <CListGroupItem href="/report/collected" color="dark" accent="dark">Cash Collected Report</CListGroupItem>
                                    <CListGroupItem to="/report/collectables" color="dark" accent="dark">Cash Collectables Report</CListGroupItem>
                                    <!-- <CListGroupItem href="#" color="dark" accent="dark">Estimates Report</CListGroupItem> -->
                                </CListGroup>
                            </CCol>
                            <CCol lg="4">
                            </CCol>
                            <CCol lg="4">
                                <CSelect
                                label="Period"
                                :value.sync="period"
                                @change="periodChange"
                                :options="['None Selected',
                                'All Time',
                                'This Month',
                                'Last Month',
                                'This Year',
                                'Last Year',
                                'Last 3 months',
                                'Last 6 months',
                                'Last 12 months',
                                'Period',
                                ]"
                                />
                            </CCol>
                        </CRow>
                        
                    </CCardHeader>
                    <CCardBody>
                        GENERATED REPORT
                    </CCardBody>
                    <CCardFooter>
                        <div align="center">
                            NO GENERATED REPORTS
                        </div>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </CMedia>
    <CElementCover 
        
        :opacity="0.8"
    >
        <h1 class="d-inline">Updating... </h1><CSpinner size="5xl" color="success"/>
    </CElementCover>
    </div>
</template>
<script>
export default {
    data(){
        return {
            period: ''
        }
    },
    methods: {
        periodChange(){
            this.$store.dispatch('report/generateCashCollectedReport', this.period);
        }
    }
}
</script>
<style>
.media .align-self-start{
    display:none;
}
</style>