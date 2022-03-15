<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardBody>
                        <PaymentTable
                            :items="$store.state.payments.payment_list"
                            v-on:event_child="printValue"
                            v-on:hover_value_print="hoverPrint"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <div id="printMe" style="margin-bottom:250px; ">
            <div style="display:flex;">
                <div style="width:75%;">
                    <img width="50%" src="/img/upload/logo.png">
                    <p style="margin:0;">249 Roosevelt Avenue Brgy. San Antonio, Quezon City</p>
                    <p style="margin:0; font-weight:bold;">Rezza Lynn S. Beting - PROP.</p>
                    <p style="margin:0;">vat reg tin: 216-374-910-000</p>
                    <p>Billed To: Janrey</p>
                    <p>TIN</p>
                    <p>Address: </p>
                </div>
                <div style="width:25%; text-align:right; margin-top:20px; margin-left:30px;">
                    <h2>PAYMENT RECEIPT</h2>
                    <p style="color:red; font-weight:bold; font-size:20px; padding-right:100px;">No. 1</p>
                    <p style="margin:0;">Tel. No: 02-8292-41-52/02-7001-90-11 </p>
                    <p style="margin:0;">Email: rakkiiautoservices@gmail.com </p>
                    <p>Date: <u>________________________________</u></p>
                    <p>Plate No.: ________________________________</p>
                    <p>Ref/Claim No.: ________________________________</p>
                    <p>Buss Style: ________________________________</p>
                </div>
            </div>
            
            <!-- <div style="text-align:right; margin-top:-70px; margin-right:150px;">
                <p style="margin:0;">(02) 796 5092 <CIcon style="width:17px;" color="#F7931E" name="cil-phone"/></p>
                <p style="margin:0;">rakkiiautoservices@yahoo.com <CIcon style="width:17px;" color="#F7931E" name="cib-gmail"/></p>
                <p style="margin:0;">71 Santol St.Niño, Quezon City, 1113 <CIcon style="width:17px;" color="#F7931E" name="cil-location-pin"/></p>
            </div>
            <div style="padding-left:50px; padding-right:50px; margin-top:80px;">
                <div style="text-align:center;">
                    <h4>Payment Receipt</h4>
                </div>
            </div> -->
        </div>
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
            payments: [],
            info: []
        }
    },
    methods: {
        printValue(data){
            alert('test');
        },
        hoverPrint(data){
            this.info = data;
        }
    },
    created(){
        this.$store.dispatch('payments/fetchPaymentList').then(() => {
            console.log(this.$store.state.payments.payment_list);
        });
        // console.log(this.$route);
        // this.$store.dispatch('job_orders/fetchJobOrder').then(() => {
        //     let payment = [];
        //         this.$store.state.job_orders.job_orders.forEach(item => {
        //             item.payments.forEach(item2 => {
        //                 payment.push({
        //                     job_order_no: item.job_order_no,
        //                     job_order_id: item.id,
        //                     id: item2.id,
        //                     customer_name: item.customer.company_name,
        //                     receipt_no: item2.receipt_no,
        //                     amount: item2.amount,
        //                     encoded_by: item2.user.name,
        //                     date: item2.date,
        //                 });
        //             })
        //         })
        //     this.payments = payment;
        // });
    }
}
</script>