<template>
    <CRow>
        <CCol lg="4">
            <CCard>
                <CCardHeader>
                    <strong>Garage</strong>
                    <div class="card-header-actions">
                        <CButton size="sm" @click="ListModalData = new Date()" color="primary"><CIcon name="cil-playlist-add"/> <CBadge color="danger">{{pending.length}}</CBadge></CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <div v-if="waiting.length != 0">
                        <div v-for="(est, index) in waiting" :key="est.id" class="pending-item px-3 py-1 mt-4">
                                <div class="pending-item-action">
                                    <CButton size="sm" @click="ModalCarInData = {trigger:new Date(), data: est}" color="info">
                                        <CIcon name="cil-car-alt"/>
                                    </CButton>
                                    <CButton size="sm" class="ml-1" color="warning">
                                        <CIcon name="cil-pen"/>
                                    </CButton>
                                    <CButton size="sm" class="ml-1" color="secondary">
                                        <CIcon name="cil-info"/>
                                    </CButton>
                                </div>
                                <CRow class="mt-2">
                                    <CCol lg="7">
                                        <small><b>CUSTOMER: </b>{{est.customer.company_name}}</small>
                                    </CCol>
                                    <CCol lg="5" align="right">
                                        <small><b>JO-000{{est.job_order_no}}</b></small>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol lg="6">
                                        <small><b>VEHICLE: </b>{{est.property.vehicle.vehicle_name}}</small>
                                    </CCol>
                                    <CCol lg="6" align="right">
                                        <small><b>PLATE NO.: {{est.property.plate_no}}</b></small>
                                    </CCol>
                                </CRow>
                        </div>
                    </div>
                    <div v-else align="center">
                        <strong>NO WAITING VEHICLE ON THE GARAGE</strong>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="8">
            <CCard>
                <CCardHeader>
                    <strong>Inprogress</strong>
                </CCardHeader>
                <CCardBody>
                    <div v-if="inprogress.length != 0">
                        <div v-for="(data, index) in inprogress" :key="index">
                        <Inprogress
                        :inprogress_item="data"
                        :index="index"
                        />
                        </div>
                    </div>
                    <div v-else align="center">
                        <strong>NO INPROGRESS VEHICLE</strong>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
        <CarInModal 
        :ModalCarInData="ModalCarInData"
        />
        <CompletedModal
        :CompletedModalData="CompletedModalData"
        />
        <EditCompletedModal
        :EditCompletedModalData="EditCompletedModalData"
        />
        <StartModal
        :StartData="StartData"
        />
        <ListModal
        :ListModalData="ListModalData"
        />
    </CRow>
</template>
<script>
import CarInModal from './CarInModal'
import Inprogress from './Inprogress';
import CompletedModal from './CompletedModal';
import EditCompletedModal from './EditCompletedModal';
import StartModal from './StartModal';
import ListModal from './ListModal';

export default {
    data(){
        return {
            ModalCarInData: '',
            CompletedModalData: '',
            EditCompletedModalData: '',
            StartData: '',
            ListModalData: '',
            Inprogress: [
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
                {
                    name: 'Christine Roa',
                    items: [
                        {
                        color: '#F9B115',
                        tag: '2018-01-12',
                        content: 'Tinsmith <a href="#completed"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon"><polygon fill="#26994D" points="200.359 382.269 61.057 251.673 82.943 228.327 199.641 337.731 428.686 108.687 451.314 131.313 200.359 382.269" class="ci-primary"></polygon></svg></a>',
                        footer: 'Commitment Date :2018-01-20 <br> Assign To: James Lajar <br> Panels: 1'
                        },
                        {
                        // tag: '2018-01-13',
                        color: '#B9BEC7',
                        type: 'circle',
                        content: 'Painting <a href="#start"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" role="img" class="c-icon"><rect width="25" height="25" x="240" y="384" fill="#26994D" class="ci-primary"></rect><rect width="25" height="25" x="96" y="240" fill="#26994D" class="ci-primary"></rect><rect width="32" height="32" x="384" y="240" fill="#26994D" class="ci-primary"></rect><path fill="#fff" d="M414.392,97.608A222.332,222.332,0,0,0,272,32.567V32H240v96h32V64.672C370.41,72.83,448,155.519,448,256c0,105.869-86.131,192-192,192S64,361.869,64,256a191.61,191.61,0,0,1,56.408-135.942l115.624,145.88,25.078-19.876L124.6,73.828l-12.606,10.59a224,224,0,1,0,302.4,13.19Z" class="ci-primary"></path></svg> </a>',
                        footer: 'CD:2018-01-20'
                        },
                        {
                        type: 'circle',
                        color: '#B9BEC7',
                        // tag: '2018-01-14',
                        content: 'Mechanical <a href="#start"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" role="img" class="c-icon"><rect width="25" height="25" x="240" y="384" fill="#26994D" class="ci-primary"></rect><rect width="25" height="25" x="96" y="240" fill="#26994D" class="ci-primary"></rect><rect width="32" height="32" x="384" y="240" fill="#26994D" class="ci-primary"></rect><path fill="#fff" d="M414.392,97.608A222.332,222.332,0,0,0,272,32.567V32H240v96h32V64.672C370.41,72.83,448,155.519,448,256c0,105.869-86.131,192-192,192S64,361.869,64,256a191.61,191.61,0,0,1,56.408-135.942l115.624,145.88,25.078-19.876L124.6,73.828l-12.606,10.59a224,224,0,1,0,302.4,13.19Z" class="ci-primary"></path></svg> </a>'
                        }
                    ]
                },
            ]
        }
    },
    components: {
        CarInModal,
        Inprogress,
        CompletedModal,
        EditCompletedModal,
        StartModal,
        ListModal
    },
    watch:{
        '$route' () {
        // this.items = this.$route.meta.breadcrumb;
            console.log(this.$route);
            const route_value = this.$route.hash.split('=');

            if(route_value[0] == '#completed'){
                this.CompletedModalData = {
                    trigger: new Date(),
                    data: this.$route.hash,
                    id: route_value[1],
                    timeline_id: route_value[2],
                    timeline_name: route_value[3],
                }
            }else if(route_value[0] == '#edit'){
                this.EditCompletedModalData = {
                    trigger: new Date(),
                    data: this.$route.hash,
                    id: route_value[1],
                    timeline_id: route_value[2],
                    timeline_name: route_value[3],
                }
            }else if(route_value[0] == '#start'){
                this.StartData = {
                    trigger: new Date(),
                    data: this.$route.hash,
                    id: route_value[1],
                    timeline_id: route_value[2],
                    timeline_name: route_value[3],
                }
            }
        }
    },
    computed: {
        pending(){
            let items =[];
            if(this.$store.state.job_orders.job_orders){
                this.$store.state.job_orders.job_orders.forEach(item => {
                    if(item.status == 'pending'){
                        items.push(item);
                    }
                });
            }
            return items;
        },
        waiting(){
            let items =[];
            if(this.$store.state.job_orders.job_orders){
                this.$store.state.job_orders.job_orders.forEach(item => {
                    if(item.status == 'waiting'){
                        items.push(item);
                    }
                });
            }
            return items;
        },
        inprogress(){
            let items =[];
            if(this.$store.state.job_orders.job_orders){
                this.$store.state.job_orders.job_orders.forEach(item => {
                    if(item.status == 'inprogress'){
                        items.push(item);
                    }
                });
            }
            return items;
        }
    },
    created(){
        this.$store.dispatch('job_orders/fetchJobOrder');
        
    }
}
</script>
<style>
.pending-item{
    color:#fff;
    background:#2E58A6;
    border-radius:5px;
    position:relative;
}
.inprogress-item{
    color:#fff;
    background:#2E58A6;
    border-radius:5px;
    position:relative;
}
.pending-item-action {
    position:absolute;
    right:10px;
    margin-top:-20px;
}
.line-container .line-item{
    padding:0px !important;
    color:#fff;
}
.line-container .item-circle {
    margin-left:-5px !important;
    width: 13px !important;
    height: 13px !important;
}
.line-container .item-footer {
    padding-top:0px !important;
    font-size:80%;
}
.line-container .item-content {
    font-size:80%;
}
</style>