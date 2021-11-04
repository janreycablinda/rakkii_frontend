<template>
    <CRow>
        <CCol lg=12>
            <CCard>
                <CCardHeader>
                    <CIcon style="margin-top:-5px;" name="cil-balance-scale"/> <strong>Sales Report</strong>
                    <CRow>
                        <CCol lg="4">
                            <CListGroup accent>
                                <!-- <CListGroupItem href="#" color="dark" accent="dark">Invoices Report</CListGroupItem>
                                <CListGroupItem href="#" color="dark" accent="dark">Items Report</CListGroupItem> -->
                                <CListGroupItem href="#" color="dark" accent="dark">Cash Collected Report</CListGroupItem>
                                <CListGroupItem href="#" color="dark" accent="dark">Payments Report</CListGroupItem>
                                <CListGroupItem href="#" color="dark" accent="dark">Estimates Report</CListGroupItem>
                            </CListGroup>
                        </CCol>
                        <CCol lg="4">
                        </CCol>
                        <CCol lg="4">
                            <CSelect
                            label="Period"
                            :options="[
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
</template>
<script>
export default {
    
}
</script>