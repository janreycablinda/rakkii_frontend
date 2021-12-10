<template>
    <CModal
      title="GATE PASS"
      color="primary"
      :show.sync="showModalGatePass"
      centered
      size="sm"
    >
       <!-- <CInput
            type="date"
            label="Date In *"
            autocomplete="name"
            v-model="form.date_in"
        />
        <CInput
            type="date"
            label="Date Out"
            autocomplete="name"
            v-model="form.date_out"
        /> -->
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="showModalGatePass = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalGatePass: false,
            items: '',
            form: {
                id: '',
                date_in: '',
                date_out: '',
            }
        }
    },
    props: ['ModalGatePassData'],
    watch: {
        ModalGatePassData(data){
            this.showModalGatePass = true;
            // this.items = data.data;
            // this.form.id = data.data.id;
        }
    },
    methods: {
        submit(){
            
            const params = {
                group_work_type: this.convertByProperty(this.items.scope, 'job_order_id', 'labor_fee'),
                form: this.form
            }
            
            this.$store.dispatch('job_orders/carStartWorking', params).then(() => {
                this.form = {
                    id: '',
                    date_in: '',
                    date_out: '',
                }
                this.showModalCarIn = false;
            });
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