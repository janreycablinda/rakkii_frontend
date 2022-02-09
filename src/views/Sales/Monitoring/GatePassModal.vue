<template>
    <CModal
      title="GATE PASS"
      color="primary"
      :show.sync="showModalGatePass"
      centered
      size="sm"
    >
        <p class="text-black"><b>Gate Pass No.:</b> {{form.gate_pass_no}}</p>
        <p class="text-black"><b>Date Time Issued:</b> {{form.date}}</p>
        <p class="text-black"><b>Customer:</b> {{form.name}}</p>
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
                gate_pass_no: '',
                date: new Date().toLocaleTimeString(),
                name: ''
            }
        }
    },
    props: ['ModalGatePassData'],
    watch: {
        ModalGatePassData(data){
            this.showModalGatePass = true;
            this.form.id = data.data.id;
            this.form.name = data.data.customer.company_name;
            this.$store.dispatch('gatepass/getPassNo').then(response => {
                this.form.gate_pass_no = response;
            });
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('gatepass/submitGatePass', this.form).then(() => {
                
                this.showModalGatePass = false;
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