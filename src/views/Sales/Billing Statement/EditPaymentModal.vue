<template>
    <CModal
      title="EDIT PAYMENT"
      color="primary"
      :show.sync="editModalPayment"
      centered
      :closeOnBackdrop="false"
      
    >   
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
        <CButton @click="submit" id="update-payment-btn" color="primary" class="branding-btn">UPADTE</CButton>
        <CButton @click="editModalPayment = false" color="danger">Cancel</CButton>
    </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            placement: 'bottom',
            editModalPayment: false,
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
    props: ['EditPaymentData'],
    watch: {
        EditPaymentData(data){
            console.log(data);
            this.form.id = data.data.id;
            this.form.billing_statement_id = data.data.billing_statement_id;
            this.form.payment_type = data.data.payment_type;
            this.form.payment_date = data.data.payment_date;
            this.form.amount = data.data.amount;
            this.form.check_date = data.data.check_date;
            this.form.check_no = data.data.check_no;
            this.form.bank_name = data.data.bank_name;
            this.form.account_name = data.data.account_name;
            this.editModalPayment = true;
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'update-payment-btn', 'UPDATE');
            this.$store.dispatch('billing/updatePayment', this.form).then(response => {
                this.$root.btn_load(false, 'update-payment-btn', 'UPDATE');
                this.$emit('update_payment', response);
                this.editModalPayment = false;
                this.form = this.getFormData();
            });
        },
        
        getFormData(){
            return {
                id: '',
                billing_statement_id: '',
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