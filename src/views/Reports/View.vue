<template>
    <div>
        <CRow>
            <CCol lg=12>
                <CCard>
                    <CCardHeader>
                        <CIcon style="margin-top:-5px;" name="cil-balance-scale"/> <strong>Reports</strong>
                        <CRow>
                            <CCol lg="4">
                                <CListGroup accent>
                                    <CListGroupItem href="#" @click="option.report = 'project'" :color="getColor('project')" accent="dark">Projects Report</CListGroupItem>
                                    <CListGroupItem href="#" @click="option.report = 'collected'" :color="getColor('collected')" accent="dark">Cash Collected Report</CListGroupItem>
                                    <CListGroupItem href="#" @click="option.report = 'collectables'" :color="getColor('collectables')" accent="dark">Cash Collectables Report</CListGroupItem>
                                </CListGroup>
                            </CCol>
                            <CCol lg="4">
                            </CCol>
                            <CCol lg="4">
                                <CSelect
                                label="Period"
                                :value.sync="option.period"
                                @change="periodChange"
                                placeholder="None Selected"
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
                                <CSelect
                                label="Status"
                                v-if="report == 'project'"
                                :value.sync="option.status"
                                @change="periodChange"
                                placeholder="None Selected"
                                :options="[
                                'All',
                                'Completed',
                                'Inprogress',
                                ]"
                                />
                            </CCol>
                        </CRow>
                        
                    </CCardHeader>
                    <CCardBody>
                        <div style="display:flex; justify-content:space-between;">
                            <span>GENERATED REPORT {{option.report}}</span>
                            <CLink><CIcon name="cil-print"/></CLink>
                        </div>
                    </CCardBody>
                    <CCardFooter>
                        <div align="center">
                            <table class="custom-table">
                                <tr>
                                    <th>CUSTOMER</th>
                                    <th>UNIT</th>
                                    <th>PLATE NO.</th>
                                    <th>DATE IN</th>
                                    <th>DATE OUT</th>
                                    <th>TOTAL COST</th>
                                    <th>LOA/APPROVAL</th>
                                    <th>NET LOA</th>
                                    <th>INSURANCE</th>
                                    <th>AGENT</th>
                                    <th>OTHER EXP/COM</th>
                                    <th>NET PROFIT</th>
                                </tr>
                            </table>
                        </div>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
export default {
    data(){
        return {
            option: {
                report: 'project',
                period: '',
                status: ''
            },
            report: 'project',
            period: '',
            status: ''
        }
    },
    methods: {
        getColor (status) {
        return status === this.option.report ? 'primary'
                : 'dark'
        },
        periodChange(){
            // this.$store.dispatch('report/generateReport', this.period);
        }
    }
}
</script>
<style>
.media .align-self-start{
    display:none;
}
</style>