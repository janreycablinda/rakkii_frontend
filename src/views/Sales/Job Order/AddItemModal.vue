<template>
    <CModal
      title="ADD ITEM"
      color="primary"
      :show.sync="showModalAddItem"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Product Name'" 
                        onfocus="this.placeholder = ''" 
                        description="Product Name" 
                        placeholder="Product Name"
                        v-model="form.product_name"
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Brand'" 
                        onfocus="this.placeholder = ''" 
                        description="Brand" 
                        placeholder="Brand"
                        v-model="form.brand"
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-item-btn" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddItem = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddItem: false,
            form: this.getFormData(),
        }
    },
    props: ['AddItemData'],
    watch: {
        AddItemData(data){
            this.showModalAddItem = true;
        },
    },
    methods: {
        submit(){

            this.$root.btn_load(true, 'add-item-btn', 'ADD');
            this.$store.dispatch('item/createItem', this.form).then(() => {
                this.$root.btn_load(false, 'add-item-btn', 'ADD');
                this.showModalAddItem = false;
            });
            // this.$root.btn_load(true, 'add-services-type-btn-modal', 'ADD');
            // this.$store.dispatch('services_type/addServicesType', this.form).then(() => {
            //     this.$root.btn_load(false, 'add-services-type-btn-modal', 'ADD');
            //     this.showModalSaveAndSend = false;
            //     this.form = this.getFormData();
            // });
        },
        getFormData(){
            return {
                product_name: '',
                brand: '',
            }
        },
    },
}
</script>