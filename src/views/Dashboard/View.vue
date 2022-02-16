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
                    <CLink to="/sales/payments">View</CLink>
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
                <CCardBody>
                <BarChart
                :job_orders="$store.state.job_orders.job_orders"
                :cash_collected="$store.state.chart.cash_collected"
                :cash_collectables="$store.state.chart.cash_collectables"
                />
                </CCardBody>
            </CCard>
        </CCol>
        <CCol col="12" sm="12" lg="4">
            <CCard style="min-height:400px;">
                <CCardHeader>
                    My To Do Items
                    <div class="card-header-actions">
                        <CLink
                        @click="showModalDataNewToDo = new Date()"
                        class="card-header-action btn-setting">
                            New To Do
                        </CLink>
                        <!-- |
                        <CLink
                        class="card-header-action btn-setting">
                            View All
                        </CLink> -->
                    </div>
                </CCardHeader>
                <CCardBody>
                    <div class="text-warning bold">
                        <span><CIcon height="12" name="cil-warning"/> Latest to do's</span>
                    </div>
                    <!-- <small v-for="todo in todos" :key="todo.id">{{todo.todo}}</small> -->
                    <CListGroup accent>
                        <draggable v-model="todos" group="todos" @change="log">
                            <CListGroupItem style="display:flex; justify-content: space-between;" v-for="element in todos" :key="element.id" color="warning" accent="warning"><div style="cursor: -webkit-grab; cursor: grab;">{{element.todo}} <br><small>{{$root.momentFormatDateTime(element.created_at)}}</small></div><div> <CLink @click="deleteTodo(element.id, 'todo')" style="color:red;"><CIcon name="cil-trash"/></CLink></div></CListGroupItem>
                        </draggable>
                    </CListGroup>
                    <!-- <draggable v-model="todos" group="id" @start="drag=true" @end="drag=false" @change="log">
                        <div v-for="element in todos" :key="element.id">{{element.todo}}</div>
                    </draggable> -->
                    <div class="text-success bold">
                        <span><CIcon height="12" name="cil-check-alt"/> Latest finished to do's</span>
                    </div>
                    <CListGroup accent>
                        <draggable v-model="todos_finished" group="todos" @change="log">
                            <CListGroupItem style="text-decoration: line-through; display:flex; justify-content: space-between;" v-for="element in todos_finished" :key="element.id" color="success" accent="success"><div style="cursor: -webkit-grab; cursor: grab;">{{element.todo}} <br><small>{{$root.momentFormatDateTime(element.created_at)}}</small></div> <div> <CLink @click="deleteTodo(element.id, 'finished')" style="color:red;"><CIcon name="cil-trash"/></CLink></div></CListGroupItem>
                        </draggable>
                    </CListGroup>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            <CCard>
                <CCardBody>
                    <!-- <CTabs>
                        <CTab title="Projects" active>
                            <ProjectTable/>
                        </CTab>
                        <CTab title="My Reminders">
                            <RemindersTable
                            :items="$store.state.job_orders.job_orders"
                            />
                        </CTab>
                    </CTabs> -->
                    <WeeklyPaymentChart
                    :weekly_payments="$store.state.payments.weekly_payments"
                    />
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="4">
            <CCard>
                <CCardHeader>Statistics by Project Status</CCardHeader>
                <StatisticsChart
                :job_orders="$store.state.job_orders.job_orders"
                />
            </CCard>
            <CCard>
                <CCardHeader>Production Status</CCardHeader>
                <ProductionStatus
                :job_orders="$store.state.job_orders.job_orders"
                />
            </CCard>
        </CCol>
    </CRow>
    <CRow>
        <CCol lg="8">
            
        </CCol>
    </CRow>
    <!-- <CRow>
        <CCol lg="8">
            <CCard>
                <Calendar/>
            </CCard>
        </CCol>
    </CRow> -->
    <!-- <CRow>
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
    </CRow> -->
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
    <NewToDo
    :showModalDataNewToDo="showModalDataNewToDo"
    />
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
import NewToDo from './NewToDo'
import draggable from 'vuedraggable'
// import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"
// import "vue-simple-calendar/dist/style.css"
// The next two lines are optional themes
// import "vue-simple-calendar/static/css/default.css"
// import "vue-simple-calendar/static/css/holidays-us.css"

	export default {
		name: 'app',
		data: function() {
			return { 
                showDate: new Date(),
                showModalDataNewToDo: ''
            }
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
            ProductionStatus,
            NewToDo,
            draggable
		},
        computed: {
            projectInprogress(){
                const job_order = this.$store.state.job_orders.job_orders;
                let total_job_order = 0;
                let inprogress = 0;
                if(job_order){
                    job_order.forEach(item => {
                        if(item.status == 'Inprogress'){
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
            },
            todos:{
                get() {
                    return this.$store.state.todo.todos;
                },
                set(value) {
                    const params = {
                        status: 'todo',
                        value: value
                    }
                    this.$store.dispatch('todo/updateTodo', params);
                }
            },
            todos_finished:{
                get() {
                    return this.$store.state.todo.todos_finished;
                },
                set(value) {
                    const params = {
                        status: 'finished',
                        value: value
                    }
                    this.$store.dispatch('todo/updateTodo', params);
                }
            }
        },
		methods: {
			setShowDate(d) {
				this.showDate = d;
			},
            add: function() {
                this.list.push({ name: "Juan" });
            },
            log(evt) {
                if(evt.added){
                    console.log(evt.added.element);
                    this.$store.dispatch('todo/changeStatusTodo', evt.added.element);
                }
            },
            deleteTodo(id, status){
                const params = {
                    id: id,
                    status: status
                }
                if (confirm('Please click ok to confirm delete')) {
                    this.$store.dispatch('todo/deleteTodo', params);
                }
                
            }
		},
        created(){
            this.$store.dispatch('job_orders/fetchJobOrder');
            this.$store.dispatch('estimate/fetchEstimate');
            this.$store.dispatch('payments/fetchPayment');
            this.$store.dispatch('chart/fetchCashCollected');
            this.$store.dispatch('chart/fetchCashCollectables');
            this.$store.dispatch('payments/fetchWeeklyPayment');
            this.$store.dispatch('todo/fetchToDo');
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
