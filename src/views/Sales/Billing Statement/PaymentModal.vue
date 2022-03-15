<template>
    <CModal
      title="PAYMENT"
      color="primary"
      :show.sync="showModalPayment"
      centered
      :closeOnBackdrop="false"
      
    >   
        <CRow class="bordered mx-1 mb-3">
            <CCol lg="6">
                <span><b>Billing No.:</b> {{info.billing_no}}</span><br>
                <span><b>Billed to.:</b> {{info.billed_to}}</span><br>
            </CCol>
            <CCol lg="6">
                <span><b>Date:</b> {{info.date}}</span><br>
                <span><b>Total Amount Due:</b> ₱{{info.amount}}</span>
            </CCol>
        </CRow>
        <CSelect
            label="Payment Type"
            :options="['Cash','Check']"
            placeholder="Nothing Selected"
            :value.sync="form.payment_type"
        />
        <CInput 
            v-if="form.payment_type"
            onblur="this.placeholder = 'Payment Date'" 
            onfocus="this.placeholder = ''" 
            description="Payment Date" 
            placeholder="Payment Date"
            type="date"
            v-model="form.payment_date"
        />
        <CInput 
            v-if="form.payment_type"
            onblur="this.placeholder = 'Amount'" 
            onfocus="this.placeholder = ''" 
            description="Amount" 
            placeholder="Amount"
            type="number"
            v-model="form.amount"
        />
        <CInput 
            v-if="form.payment_type == 'Check'"
            onblur="this.placeholder = 'Bank Name'" 
            onfocus="this.placeholder = ''" 
            description="Bank Name" 
            placeholder="Bank Name"
            v-model="form.bank_name"
        />
        <CInput 
            v-if="form.payment_type == 'Check'"
            onblur="this.placeholder = 'Check No.'" 
            onfocus="this.placeholder = ''" 
            description="Check No." 
            placeholder="Check No."
            v-model="form.check_no"
        />
        <CInput 
            v-if="form.payment_type == 'Check'"
            onblur="this.placeholder = 'Account Name'" 
            onfocus="this.placeholder = ''" 
            description="Account Name" 
            placeholder="Account Name"
            v-model="form.account_name"
        />
        <CInput 
            v-if="form.payment_type == 'Check'"
            onblur="this.placeholder = 'Check Date'"
            onfocus="this.placeholder = ''" 
            description="Check Date" 
            placeholder="Check Date"
            type="date"
            v-model="form.check_date"
        />
    <template #footer>
        <CButton @click="submit" id="submit-payment-btn" color="primary" class="branding-btn">SUBMIT</CButton>
        <CButton @click="showModalPayment = false" color="danger">Cancel</CButton>
    </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalPayment: false,
            form: this.getFormData(),
            info: {
                billing_no: '',
                billed_to: '',
                date: '',
                amount: ''
            }
        }
    },
    components: {
        vSelect
    },
    props: ['PaymentData'],
    watch: {
        PaymentData(data){
            console.log(data);
            this.form.id = data.data.id;
            this.info.billing_no = 'BIL-000' + data.data.billing_statement_no;
            if(data.data.payment_for == 'insurance'){
                this.info.billed_to = data.data.insurance.contact_person;
            }else{
                // this.info.billed_to = data.customer.company_name;
            }
            this.info.date = data.data.date;
            this.info.amount = data.data.amount;
            this.showModalPayment = true;
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'submit-payment-btn', 'SUBMIT');
            this.$store.dispatch('billing/submitPayment', this.form).then(response => {
                this.$root.btn_load(false, 'submit-payment-btn', 'SUBMIT');
                this.$emit('update_payment', response);
                this.showModalPayment = false;
                this.form = this.getFormData();
                
            });
        },
        
        getFormData(){
            return {
                id: '',
                amount: 0,
                payment_date: '',
                payment_type: '',
                bank_name: '',
                account_name: '',
                check_date: '',
                check_no: ''
            }
        },
    },
}
</script>