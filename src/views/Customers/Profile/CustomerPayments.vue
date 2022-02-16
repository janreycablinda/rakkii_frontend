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
                        Customer Payments
                    </CCardHeader>
                    <CCardBody>
                        <!-- <CRow>
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
                                    :value.sync="status"
                                    :options="['All', 'Completed', 'Pending', 'On Hold', 'Inprogress', 'Cancel']"
                                />
                            </CCol>
                        </CRow> -->
                          <PaymentTable
                          :items="payments"
                          />
                    </CCardBody>
                    <!-- <CCardFooter align="left">
                        <CButton color="primary">SAVE</CButton>
                    </CCardFooter> -->
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import PaymentTable from './PaymentTable'
import Sidebar from './Sidebar'

export default {
    components: {
        PaymentTable,
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
            payments: []
        }
    },
    methods: {
        
    },
    created(){

        this.$store.dispatch('job_orders/findCustomerJobOrder', this.$route.params.id).then(response => {
            let payment = [];
                response.forEach(item => {
                    item.payments.forEach(item2 => {
                        payment.push({
                            job_order_no: item.job_order_no,
                            job_order_id: item.id,
                            id: item2.id,
                            receipt_no: item2.receipt_no,
                            amount: item2.amount,
                            encoded_by: item2.user.name,
                            date: item2.date,
                        });
                    })
                })
            this.payments = payment;
        });
        
    },
}
</script>