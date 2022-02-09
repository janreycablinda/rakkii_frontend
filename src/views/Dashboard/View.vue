<template>
  <div>
    <CRow>
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            v-if="$ability.can('read', 'Dashboard')"
            :header="''+ follow_up + ''"
            text="For follow up"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/follow-up.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <CLink to="/sales/estimates">View</CLink>
                </div>
            </template>
            </CWidgetIcon>
        </CCol>
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            :header="projectInprogress"
            text="Project Inprogress"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/in-progress.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <CLink to="/sales/job-order">View</CLink>
                </div>
            </template>
            </CWidgetIcon>
        </CCol>
        <!-- <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            header="0/0"
            text="Tasks not finish"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/philippines-peso-currency-symbol.svg" name="cil-settings" width="24"/>
            </CWidgetIcon>
        </CCol> -->
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            :header="'₱'+ cash_collected"
            text="Cash Collected"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/cash.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <a href="#">View</a>
                </div>
            </template>
            </CWidgetIcon>
        </CCol>
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            header="₱0"
            text="Cash Collectables"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/expenses.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <a href="#">View</a>
                </div>
            </template>
            </CWidgetIcon>
        </CCol>
    </CRow>
    <CRow>
        <CCol col="12" sm="12" lg="8">
            <CCard>
                <BarChart
                :job_orders="$store.state.job_orders.job_orders"
                :cash_collected="$store.state.chart.cash_collected"
                :cash_collectables="$store.state.chart.cash_collectables"
                />
            </CCard>
        </CCol>
        <CCol col="12" sm="12" lg="4">
            <CCard style="min-height:400px;">
                <CCardHeader>
                    My To Do Items
                    <div class="card-header-actions">
                        <CLink
                        class="card-header-action btn-setting">
                            New To Do
                        </CLink>
                        |
                        <CLink
                        class="card-header-action btn-setting">
                            View All
                        </CLink>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <div class="text-warning bold">
                        <span><CIcon height="12" name="cil-warning"/> Latest to do's</span>
                    </div>
                    <small>No todos found</small>
                    <div class="text-success bold">
                        <span><CIcon height="12" name="cil-check-alt"/> Latest finished to do's</span>
                    </div>
                    <small>No finished todos found</small>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            <CCard style="min-height:475px;">
                <CCardBody>
                    <CTabs>
                        <CTab title="Projects" active>
                            <ProjectTable/>
                        </CTab>
                        <CTab title="My Reminders">
                            <RemindersTable
                            :items="$store.state.job_orders.job_orders"
                            />
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
            <!-- <CCard>
                <CRow class="mb-3">
                    <CCol lg="4">
                        <div class="container mt-3">
                            BILLING OVERVIEW
                        <hr>
                        0 DRAFT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 NOT SENT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 UNPAID
                        <CProgress
                            :value="0"
                            color="danger"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PARTIALLY PAID
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 OVERDUE
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PAID
                        <CProgress
                            :value="0"
                            color="success"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        </div>
                    </CCol>
                    <CCol lg="4">
                        <div class="container mt-3">
                            ESTIMATE OVERVIEW
                        <hr>
                        0 DRAFT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 NOT SENT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 UNPAID
                        <CProgress
                            :value="0"
                            color="danger"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PARTIALLY PAID
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 OVERDUE
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PAID
                        <CProgress
                            :value="0"
                            color="success"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        </div>
                    </CCol>
                    <CCol lg="4">
                        <div class="container mt-3">
                            PROPOSAL OVERVIEW
                        <hr>
                        0 DRAFT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 NOT SENT
                        <CProgress
                            :value="0"
                            color="secondary"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 UNPAID
                        <CProgress
                            :value="0"
                            color="danger"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PARTIALLY PAID
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 OVERDUE
                        <CProgress
                            :value="0"
                            color="warning"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        0 PAID
                        <CProgress
                            :value="0"
                            color="success"
                            show-value
                            showPercentage
                            class="mt-1"
                        />
                        </div>
                    </CCol>
                </CRow>
                <div class="container">
                <CRow>
                    
                    <CCol lg="12">
                        <hr>
                    </CCol>
                    <CCol lg="4">
                        <CWidgetSimple header="Outstanding Billing" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                    <CCol lg="4">
                        <CWidgetSimple header="Past Due Billing" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                    <CCol lg="4">
                        <CWidgetSimple header="Paid Billing" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                </CRow>
                </div> -->
            <!-- </CCard> -->
        </CCol>
        <CCol lg="4">
            <CCard>
                <CCardHeader>Statistics by Project Status</CCardHeader>
                <StatisticsChart/>
            </CCard>
            <CCard>
                <CCardHeader>Production Status</CCardHeader>
                <ProductionStatus/>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            <CCard>
                <Calendar/>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            <CCard>
                <CCardHeader>
                    Weekly Payment Records
                </CCardHeader>
                <CCardBody>
                    <WeeklyPaymentChart/>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <!-- <CRow>
        <CCol lg="8">
            <CCard>
                <CCardHeader>
                    Contracts Expiring Soon
                </CCardHeader>
                <CCardBody>
                    <ContractTable/>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow> -->
  </div>
</template>

<script>
import BarChart from './BarChart'
import StatisticsChart from './StatisticsChart'
import ProductionStatus from './ProductionStatus'
import ProjectTable from './ProjectTable'
import RemindersTable from './RemindersTable'
import WeeklyPaymentChart from './WeeklyPaymentChart'
import ContractTable from './ContractTable'
import Calendar from './Calendar'
// import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
// import "vue-simple-calendar/dist/style.css"
// The next two lines are optional themes
// import "vue-simple-calendar/static/css/default.css"
// import "vue-simple-calendar/static/css/holidays-us.css"

	export default {
		name: 'app',
		data: function() {
			return { showDate: new Date() }
		},
		components: {
			// CalendarView,
			// CalendarViewHeader,
            BarChart,
            StatisticsChart,
            ProjectTable,
            RemindersTable,
            WeeklyPaymentChart,
            ContractTable,
            Calendar,
            ProductionStatus
		},
        computed: {
            projectInprogress(){
                const job_order = this.$store.state.job_orders.job_orders;
                let total_job_order = 0;
                let inprogress = 0;
                if(job_order){
                    job_order.forEach(item => {
                        if(item.status == 'inprogress'){
                            inprogress += 1;
                        }
                    })
                    total_job_order = this.$store.state.job_orders.job_orders.length;
                }
                
                return inprogress + '/' + total_job_order;
            },
            follow_up(){
                let sum = 0;
                sum = this.$store.state.estimate.estimate.length;
                return sum;
            },
            cash_collected(){
                let sum = 0;
                this.$store.state.payments.payment.forEach(item => {
                    sum += item.amount;
                });
                return sum;
            }
        },
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
		},
        created(){
            this.$store.dispatch('job_orders/fetchJobOrder');
            this.$store.dispatch('estimate/fetchEstimate');
            this.$store.dispatch('payments/fetchPayment');
            this.$store.dispatch('chart/fetchCashCollected');
            this.$store.dispatch('chart/fetchCashCollectables');
            
        }
	}
</script>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 90vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>
