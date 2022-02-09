<template>
    <div :class="getClass()" class="inprogress-item px-3 py-1">
        <div class="ribbon-wrapper">
            <div v-if="inprogress_status" class="ribbon bg-success">
                DONE
            </div>
            <div v-else class="ribbon bg-danger">
                WORKING
            </div>
        </div>
        <CRow class="mt-2 pt-1">
            <CCol lg="5">
                <small><b>EST-000{{inprogress_item.job_order_no}}</b></small><br>
                <small><b>CLIENT: </b>{{inprogress_item.customer.company_name}}</small>
                <p class="m-0"><small><b>UNIT: </b>{{inprogress_item.property.vehicle.vehicle_name}}</small></p>
                <p class="m-0"><small><b>PLATE NO.: {{inprogress_item.property.plate_no}}</b></small></p>
                <p class="m-0"><small><b>DATE IN: </b>{{inprogress_item.car_in}}</small></p>
                <p class="m-0"><small><b>DATE OUT: </b>{{inprogress_item.car_out}}</small></p>
            </CCol>
            <CCol lg="7">
                <simple-timeline class="inprogress-timeline" :items='timeline'></simple-timeline>
            </CCol>
        </CRow>
        <div style="position:absolute; right:17px; bottom:40px;" class="mb-1">
            <CBadge color="success" v-if="inprogress_item.gatepass"><CIcon name="cil-check-alt"/>Gate Pass <CLink @mouseover="setGatePass(inprogress_item)" @click="printGatePass(inprogress_item)"><CIcon size="sm" name="cil-print" /></CLink><CLink @click="deleteGatePass(inprogress_item)" style="padding-right:5px; color:red;"><CIcon style="border-radius:5px; margin-right:-15px; background:rgba(0, 0, 0, 0.2); margin-top:-20px;" size="sm" name="cil-x" /></CLink></CBadge><br>
            <CBadge v-if="settlement_payment == 'PAID'" color="success"><CIcon name="cil-check-alt"/>Settlement Paid</CBadge>
            <CBadge v-else-if="settlement_payment == 'PARTIAL'" color="success"><CIcon name="cil-check-alt"/>Settlement Partial</CBadge>
        </div>
        <div class="inprogress-item-action" align="right">
            <CButton v-if="inprogress_item.gatepass" @click="submitComplete(inprogress_item)" size="sm" color="success">
                <CIcon name="cil-check-alt"/>
            </CButton>
            <CButton v-if="inprogress_item.gatepass == null" @click="ModalGatePassData = {trigger:new Date(), data: inprogress_item}" size="sm" class="ml-1" color="primary">
                <CIcon name="cil-exit-to-app"/>
            </CButton>
            <CButton v-else size="sm" class="ml-1" color="secondary">
                <CIcon name="cil-exit-to-app"/>
            </CButton>
            <CButton @click="ModalPayment" size="sm" class="ml-1" color="warning">
                <CIcon name="cil-money"/>
            </CButton>
            <CButton :to="'/sales/job-order/edit-job-order/' + inprogress_item.id" size="sm" class="ml-1" color="info">
                <CIcon name="cil-pen"/>
            </CButton>
        </div>
        <GatePassModal
        :ModalGatePassData="ModalGatePassData"
        />
    </div>
</template>
<script>
import GatePassModal from './GatePassModal'

export default {
    data(){
        return {
            items: [],
            ModalGatePassData: '',
            inprogress: [
                {
                    name: 'Chrismer Lao',
                    items: [
                        {
                        color: '#2EB85C',
                        tag: '2018-01-12',
                        content: '<b>TINSMITH</b> <a href="#edit"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon"><path fill="#3399FF" d="M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z" class="ci-primary"></path></svg></a>',
                        footer: '<b>Commitment Date:</b> 2018-01-20 <br> <b>Assign To:</b> James Cargo <br> <b>Panels:</b> 2 <br> <b>Date Done:</b> 2018-01-20 <br> <b>Remarks:</b> test '
                        },
                        {
                        tag: '2018-01-13',
                        color: '#F9B115',
                        type: 'circle',
                        content: '<b>PAINTING</b> <a href="#completed"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon"><polygon fill="#26994D" points="200.359 382.269 61.057 251.673 82.943 228.327 199.641 337.731 428.686 108.687 451.314 131.313 200.359 382.269" class="ci-primary"></polygon></svg></a>',
                        footer: '<b>Commitment Date:</b> 2018-01-20 <br> <b>Assign To:</b> Jose Bajar <br> <b>Panels:</b> 2 <br>'
                        },
                        {
                        type: 'circle',
                        // tag: '2018-01-14',
                        content: '<b>Mechanical</b> <a href="#start"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" role="img" class="c-icon"><rect width="25" height="25" x="240" y="384" fill="#26994D" class="ci-primary"></rect><rect width="25" height="25" x="96" y="240" fill="#26994D" class="ci-primary"></rect><rect width="32" height="32" x="384" y="240" fill="#26994D" class="ci-primary"></rect><path fill="#fff" d="M414.392,97.608A222.332,222.332,0,0,0,272,32.567V32H240v96h32V64.672C370.41,72.83,448,155.519,448,256c0,105.869-86.131,192-192,192S64,361.869,64,256a191.61,191.61,0,0,1,56.408-135.942l115.624,145.88,25.078-19.876L124.6,73.828l-12.606,10.59a224,224,0,1,0,302.4,13.19Z" class="ci-primary"></path></svg> </a>'
                        }
                    ]
                },
            ]
        }
    },
    components: {
        GatePassModal
    },
    props: ['inprogress_item', 'index'],
    computed: {
        timeline(){
            const timeline = [];
            if(this.inprogress_item){
                this.inprogress_item.timeline.forEach(item => {
                    if(item.status == 'pending'){
                        timeline.push({
                        type: 'circle',
                        content: '<b> ' + item.services_type.name + '</b> <a href="#start='+ item.job_order_id + '=' + item.id + '=' + item.services_type.name +'"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" role="img" class="c-icon"><rect width="25" height="25" x="240" y="384" fill="#26994D" class="ci-primary"></rect><rect width="25" height="25" x="96" y="240" fill="#26994D" class="ci-primary"></rect><rect width="32" height="32" x="384" y="240" fill="#26994D" class="ci-primary"></rect><path fill="#fff" d="M414.392,97.608A222.332,222.332,0,0,0,272,32.567V32H240v96h32V64.672C370.41,72.83,448,155.519,448,256c0,105.869-86.131,192-192,192S64,361.869,64,256a191.61,191.61,0,0,1,56.408-135.942l115.624,145.88,25.078-19.876L124.6,73.828l-12.606,10.59a224,224,0,1,0,302.4,13.19Z" class="ci-primary"></path></svg> </a>'
                        });
                    }else if(item.status == 'inprogress'){
                        timeline.push({
                        tag: item.date_start,
                        color: '#F9B115',
                        type: 'circle',
                        content: '<b>'+ item.services_type.name +'</b> <a href="#completed='+ item.job_order_id + '=' + item.id + '=' + item.services_type.name +'"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon"><polygon fill="#26994D" points="200.359 382.269 61.057 251.673 82.943 228.327 199.641 337.731 428.686 108.687 451.314 131.313 200.359 382.269" class="ci-primary"></polygon></svg></a>',
                        footer: '<b>Commitment Date:</b> ' + item.commitment_date + ' <br> <b>Assign To:</b> ' + item.personnel.name + ' <br> <b>Panels:</b> ' + item.panels + ' <br>'
                        });
                    }else{
                        timeline.push({
                        color: '#2EB85C',
                        tag: item.date_start,
                        content: '<b>' + item.services_type.name + '</b> <a href="#edit='+ item.job_order_id + '=' + item.id + '=' + item.services_type.name +'"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon"><path fill="#3399FF" d="M345.994,42.019,179.531,208.481A646.3,646.3,0,0,0,25.325,456.521a24.845,24.845,0,0,0,6,25.708l.087.087a24.84,24.84,0,0,0,17.611,7.342,25.172,25.172,0,0,0,8.1-1.344,646.283,646.283,0,0,0,248.04-154.207L471.62,167.646A88.831,88.831,0,0,0,345.994,42.019ZM282.531,311.48A614.445,614.445,0,0,1,60.419,453.221,614.435,614.435,0,0,1,202.158,231.108l99.162-99.161,80.372,80.372ZM448.993,145.019l-44.674,44.673L323.947,109.32l44.674-44.674a56.832,56.832,0,1,1,80.372,80.373Z" class="ci-primary"></path></svg></a>',
                        footer: '<b>Commitment Date:</b> ' + item.commitment_date + ' <br> <b>Assign To:</b> ' + item.personnel.name + ' <br> <b>Panels:</b> ' + item.panels + ' <br> <b>Date Done:</b> ' + item.date_done + ' <br> <b>Remarks:</b> ' + item.remarks + ' '
                        });
                    }
                    
                })
            }
            return timeline;
        },
        inprogress_status(){
            let sum = 0;
            let value = false;
            this.inprogress_item.timeline.forEach(item => {
                if(item.status == 'completed'){
                    sum += 1;
                }
            })
            if(sum == this.inprogress_item.timeline.length){
                value = true;
            }else{
                value = false;
            }
            return value;
        },
        settlement_payment(){
            const settlement = this.inprogress_item.payables.policy_deductible + this.inprogress_item.payables.betterment - this.inprogress_item.payables.discount;
            let status = 'UNPAID'
            let payment = 0;
            if(settlement){
                this.inprogress_item.payments.forEach(item => {
                    if(item.payment_of == 'Owner'){
                        payment += item.amount;
                    }
                })
                if(payment){
                    if(payment >= settlement){
                    status = 'PAID' 
                    }else{
                        status = 'PARTIAL'
                    }
                }else{
                    status = 'UNPAID'
                }
                
            }else{
                status = 'UNPAID'
            }
            
            return status;
        }
    },
    methods: {
        getClass(){
            if(this.index > 0){
                return 'mt-1';
            }
        },
        deleteGatePass(data){
            console.log(data);
            if (confirm('Are you sure you want to remove gate of ' + data.customer.company_name +'?')) {
                this.$store.dispatch('gatepass/deleteGatePass', data);
            }
        },
        submitComplete(data){
            if (confirm('Click OK to confirm')) {
                this.$store.dispatch('job_orders/submitComplete', data);
            }
        },
        setGatePass(data){
            this.$emit('event_print', data, 'set');
        },
        printGatePass(data){
            this.$emit('event_print', data, 'print');
        },
        getPaymentStatus(data){
            let sum = 0;
            data.payments.forEach(item => {
                if(item.payment_of == "Owner"){
                    sum += parseInt(item.amount);
                }
            })
            
            console.log(this.settlement - sum);
        },
        ModalPayment(){
            this.$emit('event_payment', this.inprogress_item);
        },
        showPayment(){

        }
    },
    created(){
        this.items = this.inprogress_item.items;
    }
}
</script>
<style>
.inprogress-timeline .item-footer{
    color:#fff !important;
}
</style>