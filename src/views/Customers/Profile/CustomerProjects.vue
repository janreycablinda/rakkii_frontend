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
                        Projects
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol lg="4">
                                <CSelect
                                    label="Vehicle Owned"
                                    :value.sync="vehicle_owned"
                                    :options="$store.state.property.property | propertyFilter"
                                />
                            </CCol>
                            <CCol lg="4">
                                <CSelect
                                    label="Status"
                                    :value.sync="vehicle_owned"
                                    :options="['All', 'Completed', 'Inprogress', 'Cancel']"
                                />
                            </CCol>
                        </CRow>
                        
                          <TransactionHistory
                          :items="items"
                          />
                    </CCardBody>
                    <CCardFooter align="left">
                        <CButton color="primary">SAVE</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import TransactionHistory from './TransactionHistory'
import Sidebar from './Sidebar'

export default {
    components: {
        TransactionHistory,
        Sidebar
    },
    filters: {
        propertyFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.vehicle.vehicle_name + ' - ' + item.plate_no, value: item.id})
                    return option
                }, [])
                options.unshift('All');
                return options;
            }
        }
    },
    watch: {
        vehicle_owned(id){
            const params = {
                id: this.$route.params.id,
                property_id: id,
                status: this.status
            }
            this.$store.dispatch('job_orders/findJobOrderStatus', params);
        },
        status(status){
            const params = {
                id: this.$route.params.id,
                property_id: this.vehicle_owned,
                status: status
            }
            this.$store.dispatch('job_orders/findJobOrderStatus', params);
        }
    },
    data(){
        return {
            placement: 'top',
            items: [{
                project_no: 1,
                date: '11/4/2021',
                personnel_assigned: 'Joshua',
                status: 'Inprogress'
            }],
            vehicle_owned: 'All',
            status: 'All'
        }
    },
    methods: {
        
    },
    created(){

        const params = {
            id: this.$route.params.id,
            property_id: this.vehicle_owned,
            status: this.status
        }

        this.$store.dispatch('job_orders/findJobOrderStatus', params);
        this.$store.dispatch('property/findProperty', this.$route.params.id);
        
    },
}
</script>