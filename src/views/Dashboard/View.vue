<template>
  <div>
    <CRow>
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            header="0"
            text="For follow up"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/philippines-peso-currency-symbol.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <a href="#">View</a>
                </div>
            </template>
            </CWidgetIcon>
        </CCol>
        <CCol col="12" sm="6" lg="3">
            <CWidgetIcon
            header="0/0"
            text="Project Inprogress"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/philippines-peso-currency-symbol.svg" name="cil-settings" width="24"/>
            <template #footer>
                <div class="wedgit-footer">
                    <a href="#">View</a>
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
            header="₱0"
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
            text="Expenses"
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
                <BarChart/>
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
            <CCard>
                <CRow class="mb-3">
                    <CCol lg="4">
                        <div class="container mt-3">
                            INVOICE OVERVIEW
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
                        <CWidgetSimple header="Outstanding Invoices" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                    <CCol lg="4">
                        <CWidgetSimple header="Past Due Invoices" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                    <CCol lg="4">
                        <CWidgetSimple header="Paid Invoices" text="₱1,123">
                        
                        </CWidgetSimple>
                    </CCol>
                </CRow>
                </div>
            </CCard>
        </CCol>
        <CCol lg="4">
            <CCard>
                <CCardHeader>Statistics by Project Status</CCardHeader>
                <StatisticsChart/>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            <CCard>
                <CCardBody>
                    <CTabs>
                        <CTab title="Projects" active>
                            <ProjectTable/>
                        </CTab>
                        <CTab title="My Reminders">
                            <RemindersTable/>
                        </CTab>
                        
                    </CTabs>
                </CCardBody>
            </CCard>
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
    <CRow>
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
    </CRow>
  </div>
</template>

<script>
import BarChart from './BarChart'
import StatisticsChart from './StatisticsChart'
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
            Calendar
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
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
