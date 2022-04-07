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
                                    <!-- <CListGroupItem href="#" @click="option.report = 'collectables'" :color="getColor('collectables')" accent="dark">Cash Collectables Report</CListGroupItem> -->
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
                                <div v-if="option.period == 'Period'" style="display:flex;">
                                    <CInput
                                    label="from"
                                    type="date"
                                    v-model="option.dates.from"
                                    @change="periodChange"
                                    />&nbsp;
                                    <CInput
                                    label="to"
                                    type="date"
                                    v-model="option.dates.to"
                                    @change="periodChange"
                                    />
                                </div>
                                <CSelect
                                label="Status"
                                v-if="option.report == 'project'"
                                :value.sync="option.status"
                                @change="periodChange"
                                placeholder="None Selected"
                                :options="[
                                'All',
                                'Completed'
                                ]"
                                />
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <div style="display:flex; justify-content:space-between;">
                            <span>GENERATED REPORT</span>
                            <CLink><CIcon name="cil-print"/></CLink>
                        </div>
                    </CCardBody>
                    <CCardFooter style="min-height:70px; position:relative;">
                        <div v-if="print_data != '' || print_data_cash_collected != ''" style="display:flex; justify-content:space-between;">
                            <div>
                                <h1 v-if="option.report == 'project'">PROJECTS REPORT</h1>
                                <h1 v-if="option.report == 'collected'">CASH COLLECTED REPORT</h1>
                            </div>
                            <div>
                                <span><b>Period:</b> {{option.period}}</span><br>
                                <span v-if="option.period == 'Period'"><b>From:</b> {{option.dates.from}} <b>To:</b> {{this.option.dates.to}} <br></span>
                                <span v-if="option.report == 'project'"><b>Status:</b> {{option.status}}</span>
                            </div>
                        </div>
                        <div align="center">
                            <table v-if="print_data != ''" class="custom-table">
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
                                    <th>EXP & PURCHASES</th>
                                    <th>NET PROFIT</th>
                                </tr>
                                <tr v-for="data in print_data" :key="data.id">
                                    <td>{{data.customer.company_name}}</td>
                                    <td>{{data.property.vehicle.vehicle_name}}</td>
                                    <td>{{data.property.plate_no}}</td>
                                    <td>{{data.car_in}}</td>
                                    <td>{{data.car_out}}</td>
                                    <td>₱{{data.payables.total_repair_cost | numFormat('0,000')}}</td>
                                    <td>₱{{data.payables.total_repair_cost | numFormat('0,000')}}</td>
                                    <td>₱{{data.payables.net | numFormat('0,000')}}</td>
                                    <td>{{data.insurance.insurance_name}}</td>
                                    <td><span v-if="data.agent">{{data.agent.name}}</span></td>
                                    <td>₱{{expenseCalculate(data) | numFormat('0,000')}}</td>
                                    <td>₱{{calculateNetProfit(data) | numFormat('0,000')}}</td>
                                </tr>
                            </table>

                            <table v-if="print_data_cash_collected != ''" class="custom-table">
                                <tr>
                                    <th>BILL NO.</th>
                                    <th>JOB ORDER NO.</th>
                                    <th>RECEIPT NO.</th>
                                    <th>CUSTOMER</th>
                                    <th>AMOUNT</th>
                                    <th>DATE</th>
                                    <th>ENCODED BY</th>
                                </tr>
                                <tr v-for="data in print_data_cash_collected" :key="data.id">
                                    <td>BILL-000{{data.billing_statement.billing_statement_no}}</td>
                                    <td>JO-000{{data.billing_statement.job_order.job_order_no}}</td>
                                    <td>RCPT-000{{data.receipt_no}}</td>
                                    <td>
                                        <span v-if="data.billing_statement.payment_for == 'customer'">{{data.billing_statement.customer.company_name}}</span>
                                        <span v-else>{{data.billing_statement.insurance.insurance_name}}</span>
                                    </td>
                                    <td>₱{{data.amount | numFormat('0,000')}}</td>
                                    <td>{{data.payment_date}}</td>
                                    <td>{{data.user.name}}</td>
                                </tr>
                            </table>

                            <h3>{{result_status}}</h3>
                            <CElementCover v-show="loading" style="position: absolute;" :opacity="0.8"/>
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
                status: '',
                dates: {
                    from: '',
                    to: ''
                }
            },
            loading: false,
            print_data: [],
            print_data_cash_collected: [],
            result_status: ''
        }
    },
    computed: {
        report(){
            return this.option.report;
        }
    },
    watch: {
        report(){
            this.option.period = '';
            this.option.status = '';
            this.option.dates.from = '';
            this.option.dates.to = '';
            this.print_data = [];
            this.print_data_cash_collected = [];
            this.result_status = '';
        }
    },
    methods: {
        getColor (status) {
        return status === this.option.report ? 'primary'
                : 'dark'
        },
        expenseCalculate(data){
            let sum_purchases = 0;
            let sum_expenses = 0;
            if(data.purchases){
                data.purchases.forEach(item => {
                    item.purchase_items.forEach(item2 => {
                        let multi = item2.qty * item2.price;
                        sum_purchases += multi;
                    });
                });
            }
            
            if(data.other_expenses){
                data.other_expenses.forEach(item => {
                    sum_expenses += item.amount;
                });
            }
            
            return sum_purchases + sum_expenses;
        },
        calculateNetProfit(data){
            let sum_purchases = 0;
            let sum_expenses = 0;
            if(data.purchases){
                data.purchases.forEach(item => {
                    item.purchase_items.forEach(item2 => {
                        let multi = item2.qty * item2.price;
                        sum_purchases += multi;
                    });
                });
            }
            
            if(data.other_expenses){
                data.other_expenses.forEach(item => {
                    sum_expenses += item.amount;
                });
            }

            let sum = sum_purchases + sum_expenses;
            
            return data.payables.total_repair_cost - sum;
        },
        periodChange(){
            if(this.option.report == 'project'){
                if(this.option.period != '' && this.option.status != ''){
                    if(this.option.period == 'Period'){
                        if(this.option.dates.from != '' && this.option.dates.to != ''){
                            this.loading = true;
                            this.$store.dispatch('report/generateReport', this.option).then(response => {
                                console.log(response);
                                this.print_data = response;
                                this.loading = false;
                            });
                        }
                    }else{
                        this.loading = true;
                        this.$store.dispatch('report/generateReport', this.option).then(response => {
                            console.log(response);
                            if(response == ''){
                                this.result_status = 'No Data Found!'
                            }else{
                                this.result_status = ''
                            }
                            this.print_data = response;
                            this.loading = false;
                        });
                    }
                }
            }else if(this.option.report == 'collected'){
                if(this.option.period != ''){
                    this.$store.dispatch('report/generateReport', this.option).then(response => {
                        if(response == ''){
                            this.result_status = 'No Data Found!'
                        }else{
                            this.result_status = ''
                        }
                        this.print_data_cash_collected = response;
                        this.loading = false;
                    });
                }
            }
        }
    }
}
</script>
<style>
.media .align-self-start{
    display:none;
}
</style>