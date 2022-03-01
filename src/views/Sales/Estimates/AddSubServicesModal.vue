<template>
    <CModal
      title="ADD SERVICES COMPONENT"
      color="primary"
      :show.sync="showModalAddSubServices"
      centered
      :closeOnBackdrop="false"
    >
            <CForm >
                
                <CRow>
                    <CCol lg="12">
                        <span><strong>Services:</strong> {{form.services_name}}</span>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="12">
                        <CInput
                            onblur="this.placeholder = 'Services Component Name'" 
                            onfocus="this.placeholder = ''"
                            description="Services Component Name" 
                            placeholder="Services Component Name"
                            v-model="form.name"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-sub-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddSubServices = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddSubServices: false,
            form: this.getFormData(),
        }
    },
    filters: {
        countryFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.nicename, value: item.nicename})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddSubServicesData'],
    watch: {
        AddSubServicesData(data){
            this.form.services_id = data.data.sub_services.services_id;
            this.form.services_name = data.data.sub_services.services.services_name;
            this.showModalAddSubServices = true;
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'add-services-sub-btn-modal', 'ADD');
            this.$store.dispatch('sub_services/addSubServices', this.form).then(response => {
                this.$emit('child_add_subservices', response);
                
                this.$root.btn_load(false, 'add-services-sub-btn-modal', 'ADD');
                this.showModalAddSubServices = false;
                this.form = this.getFormData();
            });
        },
        getFormData(){
            return {
                services_id: '',
                services_name: '',
                name: '',
            }
        },
    },
}
</script>