<template>
    <CModal
      title="CAR IN"
      color="primary"
      :show.sync="showModalCarIn"
      centered
      size="sm"
    >
       <CInput
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
        />
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="showModalCarIn = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalCarIn: false,
            items: '',
            form: {
                date_in: '',
                date_out: '',
            }
        }
    },
    props: ['ModalCarInData'],
    watch: {
        ModalCarInData(data){
            this.showModalCarIn = true;
            this.items = data.data;
            console.log(data.data);
        }
    },
    methods: {
        submit(){
            const params = {
                group_work_type: this.convertByProperty(this.items.scope, 'job_order_id', 'labor_fee'),
                form: this.form
            }
            console.log(this.convertByProperty(this.items.scope, 'job_order_id', 'labor_fee'));
            
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