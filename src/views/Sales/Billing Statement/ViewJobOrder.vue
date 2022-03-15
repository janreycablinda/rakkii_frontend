<template>
    <CModal
      title="JOB ORDER VIEWER"
      color="primary"
      :show.sync="showModalViewJobOrder"
      centered
      size="lg"
      
    >
        <div v-if="info" style="display:flex; justify-content:space-between;">
            <div class="content-left">
                <span><b>CUSTOMER:</b> {{info.customer.company_name}}</span><br/>
                <span><b>VEHICLE:</b> {{info.property.vehicle.vehicle_name}} ({{info.property.plate_no}})</span><br/>
            </div>
            <div class="content-right">
                <span><b>DATE:</b> {{info.date}}</span><br/>
                <span><b>INSURANCE:</b> {{info.insurance.insurance_name}}</span><br/>
            </div>
        </div>
         <table v-if="info" class="custom-table">
            <tr>
                <th width="80%">
                    SCOPE OF WORK
                </th>
                <th width="10%">
                    LABOR
                </th>
                <th width="10%">
                    PARTS
                </th>
            </tr>
            <tr v-for="services in info.scope" :key="services.id">
                <td>
                    {{services.services.services_name}}
                    <ul class="custom-ul" v-for="sub in services.sub_services" :key="sub.id">
                        <li>{{sub.sub_services.services_name}}</li>
                    </ul>
                </td>
                <td>
                    ₱{{services.labor_fee}}
                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                        <li style="margin-left: -40px; list-style-type: none;">₱{{sub.labor_fee}}</li>
                    </ul>
                </td>
                <td>
                    ₱{{services.labor_fee}}
                    <ul class="custom-ul2" v-for="sub in services.sub_services" :key="sub.id">
                        <li style="margin-left: -40px; list-style-type: none;">₱{{sub.parts_fee}}</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td align="right">
                    SUB-TOTAL:
                </td>
                <td class="bordered-top border-left">
                    ₱{{sub_total_labor}}
                </td>
                <td class="bordered-top border-left">
                    ₱{{sub_total_parts}}
                </td>
            </tr>
            <tr>
                <td align="right">
                    12% VAT:
                </td>
                <td class="bordered-top border-left">
                    ₱{{total_vat}}
                </td>
                <td class="bordered-top border-left">
                    
                </td>
            </tr>
            <tr>
                <td class="bordered-top">
                    <strong>TOTAL LABOR AND PARTS</strong>
                </td>
                <td colspan="2" class="bordered-top border-left">
                    <strong>₱{{total_labor_parts}}</strong>
                </td>
                
            </tr>
        </table>
        <CRow v-if="info" class="mt-2">
            <CCol lg="6"></CCol>
            <CCol lg="6">
                <table class="custom-table">
                    <tr>
                        <td>TOTAL REPAIR COST</td>
                        <td>₱{{info.payables.total_repair_cost}}</td>
                    </tr>
                    <tr>
                        <td>LESS: POLICY DEDUCTIBLE</td>
                        <td>₱{{info.payables.policy_deductible}}</td>
                    </tr>
                    <tr>
                        <td>BETTERMENT</td>
                        <td>₱{{info.payables.betterment}}</td>
                    </tr>
                    <tr>
                        <td>DISCOUNT</td>
                        <td>₱{{info.payables.discount}}</td>
                    </tr>
                    <tr>
                        <td>NET</td>
                        <td>₱{{info.payables.net}}</td>
                    </tr>
                </table>
            </CCol>
        </CRow>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalViewJobOrder: false,
            info: ''
        }
    },
    props: ['viewJobOrderData'],
    watch: {
        viewJobOrderData(data){
            this.showModalViewJobOrder = true;
            this.$store.dispatch('job_orders/findJobOrder', data.id).then(response => {
          
                this.info = response;
                
            });
        }
    },
    computed: {
        sub_total_labor(){
            let service_labor = 0;
            let sub_service_parts = 0
            if(this.info){
                this.info.scope.forEach(item => {
                    service_labor += parseInt(item.labor_fee)
                    item.sub_services.forEach(item_sub => {
                        sub_service_parts += parseInt(item_sub.labor_fee);
                    })
                })
            }
            
            return service_labor + sub_service_parts;
        },
        sub_total_parts(){
            let service_parts = 0;
            let sub_service_parts = 0;
            if(this.info){
               this.info.scope.forEach(item => {
                    service_parts += parseInt(item.parts_fee)
                    item.sub_services.forEach(item_sub => {
                        sub_service_parts += parseInt(item_sub.parts_fee);
                    })
                }) 
            }
                
            return service_parts + sub_service_parts;
        },
        total_vat(){
            return this.sub_total_labor * 0.12;
        },
        total_labor_parts(){
            return this.sub_total_labor + this.sub_total_parts + this.total_vat;
        }
    },
    methods: {
        
    },
    created(){
        
    }
}
</script>
<style>
.custom-table td {
    padding:0 !important;
}
</style>