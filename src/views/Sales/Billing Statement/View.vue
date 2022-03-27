<template>
    <div>
        <CRow>
            <CCol :lg="col_size">
                <CCard>
                    <CCardHeader>
                        <CButton to="/sales/billing-statement/create" size="sm" color="primary">
                            CREATE BILLING STATEMENT
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <BillingTable
                        :items="$store.state.billing.billings"
                        v-on:payment_modal="showPaymentModal"
                        v-on:event_child="openMoreInfo"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol v-if="info" :lg="col_size">
                <CCard>
                    <CCardHeader>
                        <CButton @click="info = ''; col_size = 12" size="sm" color="secondary">
                            <span><CIcon name="cil-caret-left"/></span>
                        </CButton>&nbsp;
                        <CBadge :color="getBadge(billingStatus(info))" class="my-0 p-2 capetalize">{{billingStatus(info)}}</CBadge>
                        <div class="card-header-actions">
                            <CButton @click="deleteBilling(info)" size="sm" color="danger" style="position:absolute; top:10px; right:100px;">
                                <CIcon name="cil-trash" />
                            </CButton>
                            <CButton :to="'/sales/billing-statement/edit/' + info.id" size="sm" color="secondary" style="position:absolute; top:10px; right:60px;">
                                <CIcon name="cil-pen" />
                            </CButton>
                            <!-- <CButton size="sm" color="secondary" style="position:absolute; top:10px; right:272px;">
                                <CIcon name="cib-adobe-acrobat-reader" />
                            </CButton> -->
                            <CDropdown
                                color="secondary"
                                size="sm"
                                style="position:absolute; top:10px; right:10px;"
                            >
                                <template #toggler-content>
                                    <CIcon name="cib-adobe-acrobat-reader" />
                                </template>
                                <CDropdownItem @click="downloadPdf">Download</CDropdownItem>
                                <CDropdownItem @click="print">Print</CDropdownItem>
                            </CDropdown>
                            <!-- <CButton size="sm" @click="showMail" color="secondary" style="position:absolute; top:10px; right:10px;">
                                <CIcon name="cil-envelope-closed" />
                            </CButton> -->
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CTabs>
                            <CTab title="Billing Statement" active>
                                <CRow v-if="info">
                                    <CCol lg="12" class="mt-3">
                                        <CLink><h4>BIL-000{{info.billing_statement_no}}</h4></CLink>
                                    </CCol>
                                    <CCol lg="6">
                                        <span><b>Job Order No.:</b> JO-000{{info.job_order.job_order_no}}</span><br>
                                        <span v-if="info.payment_for == 'insurance'"><b>Billed to:</b> {{info.insurance.insurance_name}}</span><br>
                                        <span v-if="info.payment_for == 'customer'"><b>Billed to:</b> {{info.customer.company_name}}</span>
                                        <span><b>TIN:</b> {{info.tin}}</span><br>
                                        <span><b>Address:</b> {{info.address}}</span>
                                    </CCol>
                                    <CCol lg="6" align="right">
                                        <span><b>Date:</b> {{info.date}}</span><br>
                                        <span><b>Plate No:</b> {{info.plate_no}}</span><br>
                                        <span><b>Ref/Claim No.:</b> {{info.ref_claim_no}}</span><br>
                                        <span><b>Buss. Style:</b> {{info.buss_style}}</span>
                                    </CCol>
                                </CRow>
                                <CRow v-if="info">
                                    <CCol>
                                        <table class="custom-table">
                                            <tr>
                                                <th width="40%">Description</th>
                                                <th>Unit Cost</th>
                                                <th>Qty</th>
                                                <th>Labor</th>
                                                <th>Materials</th>
                                            </tr>
                                            <tr v-for="details in info.billing_details" :key="details.id">
                                                <td>
                                                    <span v-if="details.type == 'services'">{{details.services.services_name}}</span>
                                                    <span v-if="details.type == 'sub_services'">{{details.sub_services.services_name}}</span>
                                                    <span v-if="details.type == 'custom'">{{details.description}}</span>
                                                </td>
                                                <td>₱{{details.unit_cost | numFormat('1,000')}}</td>
                                                <td>{{details.qty}}</td>
                                                <td>₱{{details.labor | numFormat('1,000')}}</td>
                                                <td>{{details.unit_cost * details.qty | numFormat('1,000')}}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" align="right"><b class="mr-1">VAT</b></td>
                                                <td colspan="3"><b>₱{{total_vat | numFormat('1,000')}}</b></td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" align="right"><b class="mr-1">TOTAL AMOUNT DUE</b></td>
                                                <td colspan="3"><b>₱{{total_amount_due | numFormat('1,000')}}</b></td>
                                            </tr>
                                        </table>
                                    </CCol>
                                </CRow>
                            </CTab>
                            <CTab title="Payment & Receipt">
                                <CButton class="mt-3" @click="showPaymentModal(info)" color="primary" size="sm"><CIcon name="cil-plus"/> PAYMENT</CButton>
                                <PaymentTable
                                :items="info.billing_payment"
                                v-on:delete_payment="deletePayment"
                                v-on:edit_payment="editPayment"
                                />
                            </CTab>
                            <!-- <CTab title="Mail">
                            </CTab> -->
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <PaymentModal
        :PaymentData="PaymentData"
        v-on:update_payment="updatePayment"
        />
        <EditPaymentModal
        :EditPaymentData="EditPaymentData"
        v-on:update_payment="mergePayment"
        />
    </div>
</template>
<script>
import BillingTable from './BillingTable';
import PaymentModal from './PaymentModal';
import PaymentTable from './PaymentTable';
import EditPaymentModal from './EditPaymentModal';
export default {
    data(){
        return {
            PaymentData: '',
            col_size: 12,
            EditPaymentData: '',
            info: ''
        }
    },
    components: {
        BillingTable,
        PaymentModal,
        PaymentTable,
        EditPaymentModal
    },
    computed: {
        total_vat(){
            let total_labor = 0;
            if(this.info){
                this.info.billing_details.forEach(item => {
                    total_labor+=parseInt(item.labor);
                })
            }
            
            return total_labor * 0.12;
        },
        total_amount_due(){
            let total_material = 0;
            let total_labor = 0;
            if(this.info){
                this.info.billing_details.forEach(item => {
                    total_material+=parseInt(item.materials);
                    total_labor+=parseInt(item.labor);
                })
            }
            return parseInt(total_material) + parseInt(total_labor) + this.total_vat;
        }
    },
    methods: {
        showPaymentModal(data){
            this.PaymentData = {
                trigger: new Date(),
                data: data
            }
        },
        billingStatus(data){
            var sum = 0;
            var amount = data.amount;
            this.info.billing_payment.forEach(item => {
                sum+=item.amount;
            })
            
            return sum >= amount ? 'Paid'
                : sum > 0 ? 'Partial Payment'
                : 'Unpaid'
        },
        mergePayment(data){
            const index = this.info.billing_payment.findIndex(item => item.id === data.id);
            if(index !== -1){
                this.info.billing_payment.splice(index, 1, data);
            }
        },
        editPayment(data){
            
            this.EditPaymentData = {
                trigger: new Date(),
                data: data
            }
        },
        deletePayment(id){
            let items = this.info.billing_payment.filter(item => item.id != id);
            this.info.billing_payment = items;
        },
        updatePayment(data){
            let items = this.info.billing_payment.concat(data);
            this.info.billing_payment = items;
        },
        openMoreInfo(data){
            this.info = data;
            this.col_size = 6;
        },
        deleteBilling(data){
            if (confirm('Are you sure you want to delete Billing-000' + data.billing_statement_no +'?')) {
                this.$store.dispatch('billing/deleteBilling', data.id);
                this.info = '';
                this.col_size = 12;
            }
        },
        showMail(){

        },
        downloadPdf(){

        },
        print(){

        },
        getBadge (status) {
        return status === 'Paid' ? 'success'
            : status === 'draft' ? 'secondary'
            : status === 'Unpaid' ? 'warning'
            : status === 'disapproved' ? 'danger' : 'primary'
        },
    },
    created(){
        console.log(this.$route);
        this.$store.dispatch('billing/fetchBilling');
    }
}
</script>