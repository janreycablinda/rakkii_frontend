<template>
    <CModal
      title="BILLING STATEMENT"
      color="primary"
      :show.sync="showModalPayment"
      centered
      size="lg"
    >
    <CButton :to="'/sales/billing-statement/create?jo=' + id" color="primary">CREATE BILLING STATEMENT</CButton>

    <BillingTable
    :items="billings"
    />
    <!-- <div class="custom_border_row"> -->
        <!-- <CRow>
            <CCol lg="4" align="center" style="border-right:1px solid #768192;">
                <p class="pb-2 bold border-bottom" style="color:#768192;">LOA APPROVED BUDGET</p>
                <CInput
                    readonly
                    label="Total Repair Cost"
                    autocomplete="name"
                    v-model="form_payment.total_repair_cost"
                />
                <CInput
                    readonly
                    label="Less: Policy Deductible"
                    autocomplete="name"
                    v-model="form_payment.less_deductible"
                />
                <CInput
                    readonly
                    label="Betterment"
                    autocomplete="name"
                    v-model="form_payment.betterment"
                />
                <CInput
                    readonly
                    label="Discount"
                    autocomplete="name"
                    v-model="form_payment.discount"
                />
                <CInput
                    readonly
                    label="NET"
                    autocomplete="name"
                    v-model="net"
                />
                <CInput
                    readonly
                    label="Settlement Payment"
                    autocomplete="name"
                    v-model="settlement"
                />
                <p class="pb-2 bold border-bottom" style="color:#768192;">SUMMARY</p>
                <CInput
                    readonly
                    label="Settlement Balance"
                    autocomplete="name"
                    :value="settlement_balance"
                    type="number"
                />
                <CInput
                    readonly
                    type="number"
                    label="Overall Balance"
                    autocomplete="name"
                    :value="overall_balance"
                />
            </CCol>
            <CCol lg="8" style="border-left:1px solid #768192;" align="center">
                <p class="pb-2 bold border-bottom" style="color:#768192;">PAYMENT</p>
                <CRow :form="true">
                    <CCol lg="4">
                        <CSelect
                            label="Payment of"
                            :options="['Owner', 'LOA']"
                            placeholder="Nothing Selected"
                            :value.sync="form.payment_of"
                        />
                    </CCol>
                    <CCol lg="3">
                        <CInput
                            label="Amount"
                            autocomplete="name"
                            v-model="form.amount"
                        />
                    </CCol>
                    <CCol lg="4">
                        <CInput
                            label="Date"
                            type="datetime-local"
                            autocomplete="name"
                            v-model="form.date"
                        />
                    </CCol>
                    <CCol lg="1">
                        <CButton size="sm" @click="submit" color="primary" class="branding-btn"><CIcon name="cil-save"/></CButton>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <PaymentTable
                        :items="form.payments"
                        v-on:event_child="childAction"
                        />
                    </CCol>
                </CRow>
            </CCol>
        </CRow> -->
    <!-- </div> -->
        <template #footer>
            <!-- <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton> -->
            <CButton @click="showModalPayment = false" color="danger">Close</CButton>
        </template>
    </CModal>
</template>
<script>
import BillingTable from '../Job Order/BillingTable';
export default {
    data(){
        return {
            showModalPayment: false,
            items: '',
            form: this.getEmptyForm(),
            form_payment: this.getEmptyFormPayment(),
            id: '',
            billings: []
        }
    },
    components: {
        BillingTable
    },
    props: ['ModalPaymentData'],
    watch: {
        ModalPaymentData(data){
            this.showModalPayment = true;
            console.log(data.data);
            this.id = data.data.id;
            this.billings = data.data.billings;
            // this.form.payments = this.getEmptyFormPayment();
            // this.form.payments = data.data.payments;
            // this.form.id = data.data.id;
            // this.form_payment.betterment = data.data.payables.betterment;
            // this.form_payment.less_deductible = data.data.payables.policy_deductible;
            // this.form_payment.total_repair_cost = data.data.payables.total_repair_cost;
            // this.form_payment.discount = data.data.payables.discount;
            // this.items = data.data;
            // this.form.id = data.data.id;
        }
    },
    computed: {
        settlement(){
            return this.form_payment.less_deductible + this.form_payment.betterment - this.form_payment.discount;
        },
        net(){
            return this.form_payment.total_repair_cost - this.form_payment.betterment - this.form_payment.less_deductible;
        },
        settlement_balance(){
            let sum = 0;
            this.form.payments.forEach(item => {
                if(item.payment_of == "Owner"){
                    sum += parseInt(item.amount);
                }
            })
            return this.settlement - sum;
        },
        overall_balance(){
            let sum = 0;
            this.form.payments.forEach(item => {
                sum += parseInt(item.amount);
            })
            console.log("total_repair_cost", this.form_payment.total_repair_cost);
            console.log("sum", sum);
            return parseInt(this.form_payment.total_repair_cost) - parseInt(sum);
        }
    },
    methods: {
        submit(){
            
            this.$store.dispatch('job_orders/addPayment', this.form).then(data => {
                this.form.amount = 0;
                this.form.payment_of = '';
                this.form.date = '';
                this.form.payments.push(data);
            });
        },
        childAction(id){
            let items = this.form.payments.filter(item => item.id != id);
            this.form.payments = items;
        },
        getEmptyForm(){
            return {
                id: '',
                amount: 0,
                payment_of: '',
                date: '',
                payments: []
            }
        },
        getEmptyFormPayment(){
            return {
                total_repair_cost: 0,
                less_deductible: 0,
                betterment: 0,
                discount: 0,
            }
        },
        convertByProperty(originalObject, groupByProperty, secondProperty) {  
            var finalArray = [];  
            var uniqueVals = [];  
            originalObject.map((i) => {  
                var existingVals = uniqueVals.filter((j) => {  
                    return (i['services']['services_type_id'] == j)  
                });  
                if (existingVals.length == 0) {  
                    uniqueVals.push(i['services']['services_type_id']);
                }  
            });  
            uniqueVals.map((k) => {  
                var dataObj = [];  
                var expectedObj = {};  
                var items = originalObject.filter((l) => {  
                    return (l[groupByProperty] == k)  
                });  
                items.map((m) => {  
                    var obj = {};  
                    obj[secondProperty] = m[secondProperty];  
                    dataObj.push(obj);
                });
                expectedObj['services_type_id'] = k;  
                expectedObj['data'] = dataObj;
                
                finalArray.push(expectedObj);  
            });  
            return finalArray;
        },
    }
}
</script>
<style>
.custom_border_row{
    border:2px solid #768192;
    padding:20px;
}
</style>