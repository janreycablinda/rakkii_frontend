<template>
    <CRow>
        <CCol col="12">
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol lg="12">
                            <h2 class="mb-3">BILLING STATEMENT: <span style="color:red;">NO. 000{{this.form.billing_statement_no}}</span></h2>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="8">
                            <div class="form-group mb-0" style="display:flex;">
                                <label>Job Order No. *</label>
                                <v-select
                                    :options="$store.state.job_orders.job_orders | jobOrderFilter"
                                    placeholder="Nothing Selected"
                                    class="mb-3"
                                    style="width:100%;"
                                    v-model="form.job_order_id"
                                    :reduce="label => label.value"
                                >
                                </v-select>
                                <CLink v-if="form.job_order_id" @click="viewJobOrder" class="custom-search"><CIcon name="cil-find-in-page"/></CLink>
                            </div>
                            <div class="form-group">
                                <label>Billed To *</label>
                                <v-select
                                    :options="billed_to_option"
                                    placeholder="Nothing Selected"
                                    class="mb-3"
                                    :reduce="label => label.value"
                                    style="width:100%;"
                                    v-model="form.billed_to"
                                >
                                </v-select>
                            </div>
                            <CInput 
                            v-model="form.tin" 
                            onblur="this.placeholder = 'TIN'" 
                            onfocus="this.placeholder = ''" 
                            description="TIN" 
                            placeholder="TIN"
                            />
                            <CInput 
                            v-model="form.address" 
                            onblur="this.placeholder = 'Address'" 
                            onfocus="this.placeholder = ''" 
                            description="Address"
                            placeholder="Address"
                            />
                        </CCol>
                        <CCol lg="4">
                            <CInput 
                            v-model="form.date" 
                            onblur="this.placeholder = 'Date'" 
                            onfocus="this.placeholder = ''" 
                            description="Date" 
                            placeholder="Date"
                            type="datetime-local"
                            />
                            <CInput 
                            v-model="form.plate_no" 
                            onblur="this.placeholder = 'Plate No.'" 
                            onfocus="this.placeholder = ''" 
                            description="Plate No." 
                            placeholder="Plate No."
                            />
                            <CInput 
                            v-model="form.ref_claim_no" 
                            onblur="this.placeholder = 'Ref/Claim No.'" 
                            onfocus="this.placeholder = ''" 
                            description="Ref/Claim No." 
                            placeholder="Ref/Claim No."
                            />
                            <CInput 
                            v-model="form.buss_style" 
                            onblur="this.placeholder = 'Buss. Style'" 
                            onfocus="this.placeholder = ''" 
                            description="Buss. Style" 
                            placeholder="Buss. Style"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="12">
                            <table class="new-custom-table mt-2" style="width:100%;">
                                <tr>
                                    <th width="45%">DESCRIPTION</th>
                                    <th width="20%">UNIT COST</th>
                                    <th width="10%">QTY</th>
                                    <th width="10%">LABOR</th>
                                    <th width="10%">MATERIALS</th>
                                    <th width="5%">&nbsp;</th>
                                </tr>
                                <EditItem
                                v-for="(data, index) in form.payment_details"
                                :key="index"
                                :item_index="index"
                                :description_option="description_option"
                                :payment="data"
                                v-on:new_line_table_data="newLineTableData"
                                v-on:switch_change="switchChange"
                                v-on:total_material_change="totalMaterialChange"
                                />
                                <tr>
                                    <td colspan="3" align="right"><b class="mr-1">VAT</b></td>
                                    <td colspan="3"><b>₱{{total_vat}}</b></td>
                                </tr>
                                <tr>
                                    <td colspan="3" align="right"><b class="mr-1">TOTAL AMOUNT DUE</b></td>
                                    <td colspan="3"><b>₱{{total_amount_due}}</b></td>
                                </tr>
                            </table>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="12">
                            <CButton id="billing-statement-update" @click="submit" class="mt-3" color="primary">UPDATE</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <ViewJobOrder
        :viewJobOrderData="viewJobOrderData"
        />
    </CRow>
</template>
<script>
import vSelect from 'vue-select'
import EditItem from './EditItem'
import ViewJobOrder from './ViewJobOrder'

export default {
    components: {
        vSelect,
        EditItem,
        ViewJobOrder
    },
    data(){
        return {
            form: this.getEmptyForm(),
            billed_to_option: [],
            job_order: '',
            description_option: [],
            viewJobOrderData: ''
        }
    },
    watch:{
        job_order_id(newVal){
            console.log(newVal);
            this.billed_to_option = [];
            // this.form.billed_to = '';
            this.job_order = '';
            this.$store.dispatch('job_orders/findJobOrder', newVal).then(response => {
                this.job_order = response;
                console.log(response);
                this.form.plate_no = response.property.plate_no;
                this.billed_to_option = [
                    {
                        value: response.customer_id,
                        label: response.customer.company_name,
                        payment_for: 'customer'
                    },
                    {
                        value: response.insurance_id,
                        label: response.insurance.insurance_name,
                        payment_for: 'insurance'
                    }
                ]
            })
        },
        billed_to(newVal){
            console.log(newVal);
            if(newVal.payment_for == 'customer'){
                if(this.job_order){
                    this.form.tin = '';
                    this.form.address = this.job_order.customer.address;
                }
            }else{
                if(this.job_order){
                    this.form.tin = this.job_order.insurance.tin;
                    this.form.address = this.job_order.insurance.address;
                }
                
            }
        }
    },
    computed:{
        job_order_id(){
            return this.form.job_order_id;
        },
        total_vat(){
            let total_labor = 0;
            this.form.payment_details.forEach(item => {
                total_labor+=parseInt(item.labor);
            })
            return total_labor * 0.12;
        },
        billed_to(){
            return this.form.billed_to;
        },
        total_amount_due(){
            let total_material = 0;
            let total_labor = 0;
            this.form.payment_details.forEach(item => {
                total_material+=parseInt(item.materials);
                total_labor+=parseInt(item.labor);
            })
            return parseInt(total_material) + parseInt(total_labor) + this.total_vat;
        }
    },
    filters: {
        jobOrderFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: 'JO-000' +item.job_order_no, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'billing-statement-update', 'UPDATE');
            const params = {
                job_order_id: this.form.job_order_id,
                billed_to: this.form.billed_to,
                tin: this.form.tin,
                address: this.form.address,
                date: this.$root.momentFormatDateTimeConvert(this.form.date),
                plate_no: this.form.plate_no,
                ref_claim_no: this.form.ref_claim_no,
                buss_style: this.form.buss_style,
                payment_for: this.form.billed_to.payment_for,
                payment_details: this.form.payment_details,
                total_amount: this.total_amount_due
            }
            
            this.$store.dispatch('billing/addBilling', params).then(() => {
                this.$router.replace({
                    name: "Billing Statement"
                });
            });
        },
        viewJobOrder(){
            this.viewJobOrderData = {
                trigger: new Date(),
                id: this.form.job_order_id
            }
            
        },
        getEmptyForm(){
            return {
                job_order_id: '',
                billed_to: '',
                tin: '',
                address: '',
                date: this.$root.momentFormatDateTimeGet(),
                plate_no: '',
                ref_claim_no: '',
                buss_style: '',
                billing_statement_no: '',
                payment_details: [
                    {
                        description: '',
                        unit_cost: 0,
                        qty: 0,
                        labor: 0,
                        materials: 0,
                        custom: false
                    }
                ]
            }
        },
        totalMaterialChange(index, data, newValue){
            this.form.payment_details.splice(index, 1, {
                description: data.description,
                unit_cost: data.unit_cost,
                qty: data.qty,
                labor: data.labor,
                materials: newValue,
                custom: data.custom
            });
        },
        switchChange(index, data){
            this.form.payment_details.splice(index, 1, {
                description: '',
                unit_cost: data.unit_cost,
                qty: data.qty,
                labor: data.labor,
                materials: data.materials,
                custom: !data.custom
            });
        },
        newLineTableData(action, data){
            if(action == 'add'){
                this.form.payment_details.push(
                {
                    description: '',
                    unit_cost: 0,
                    qty: 0,
                    labor: 0,
                    materials: 0,
                    custom: false
                })
            }else{
                if(this.form.payment_details.length != 1){
                    this.form.payment_details.splice(this.form.payment_details.indexOf(data), 1);
                }
            }
        }
    },
    created(){
        // findBillingStatement
        console.log(this.$route.params.id);

        this.$store.dispatch('billing/findBillingStatement', this.$route.params.id).then(response => {
            console.log(response);
            this.form.job_order_id = response.job_order_id;
            this.form.tin = response.tin;
            this.form.address = response.address;
            this.form.date = this.$root.momentFormatDateTimeInput(response.date);
            this.form.billing_statement_no = response.billing_statement_no;
            this.form.plate_no = response.plate_no;
            this.form.ref_claim_no = response.ref_claim_no;
            this.form.buss_style = response.buss_style;
            if(response.payment_for == 'insurance'){
                this.form.billed_to = response.insurance_id;
            }else{
                this.form.billed_to = response.customer_id;
            }

            let payment_details = [];
            response.billing_details.forEach(item => {
                let description = '';
                if(item.type == 'custom'){
                    description = item.description;
                }else if(item.type == 'services'){
                    description = item.services_id;
                }else{
                    description = item.sub_services_id;
                }
                payment_details.push({
                    description: description,
                    unit_cost: item.unit_cost,
                    qty: item.qty,
                    labor: item.labor,
                    materials: item.materials,
                    custom: item.custom
                })
            });
            
            this.form.payment_details = payment_details;
            
        });
        this.$store.dispatch('services/fetchServices').then(() => {
            let description_option = [];
            this.$store.state.services.services.forEach(item => {
                description_option.push({
                    id: item.id,
                    services_name: item.services_name,
                    type: 'services'
                });
                item.sub_services.forEach(sub => {
                    description_option.push({
                        id: sub.id,
                        services_name: sub.services_name,
                        type: 'sub_services'
                    });
                })
            });
            this.description_option = description_option;
        });
        this.$store.dispatch('job_orders/fetchJobOrder');
        
    }
}
</script>
<style>
.custom-table {
    width:100%;
}
.custom-table th{
    background:#415164;
    color:#fff;
    padding:8px 15px;
}
.custom-table td{
    padding:8px 15px;
}
.new-custom-table th{
    background:#3C4B64;
    color:#fff;
    padding:10px 0px 10px 10px;
}
.new-custom-table tr, .new-custom-table td{
    border:#3C4B64 solid 1px;
}
.new-custom-table .form-group{
    margin-bottom:0px !important;
}
.custom-search{
    background:#3C4B64;
    height:34px;
    padding:6px 7px 7px 7px;
    color:#fff !important;
    border-radius:0px 5px 5px 0px;
    margin-left:-2px;
}
</style>