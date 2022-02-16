<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardBody>
                        <PaymentTable
                            :items="payments"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import PaymentTable from './PaymentTable';
export default {
    components: {
        PaymentTable
    },
    data(){
        return {
            payments: []
        }
    },
    created(){
        console.log(this.$route);
        this.$store.dispatch('job_orders/fetchJobOrder').then(() => {
            let payment = [];
                this.$store.state.job_orders.job_orders.forEach(item => {
                    item.payments.forEach(item2 => {
                        payment.push({
                            job_order_no: item.job_order_no,
                            job_order_id: item.id,
                            id: item2.id,
                            customer_name: item.customer.company_name,
                            receipt_no: item2.receipt_no,
                            amount: item2.amount,
                            encoded_by: item2.user.name,
                            date: item2.date,
                        });
                    })
                })
            this.payments = payment;
        });
    }
}
</script>