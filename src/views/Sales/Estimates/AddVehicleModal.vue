<template>
    <CModal
      title="ADD VEHICLE"
      color="primary"
      :show.sync="showModalAddVehicle"
      centered
      :closeOnBackdrop="false"
    >
            <CForm >
                <CRow class="mt-3">
                    <CCol lg="12">
                        <CInput
                            onblur="this.placeholder = 'Vehicle'" 
                            onfocus="this.placeholder = ''"
                            description="Vehicle"
                            placeholder="Vehicle"
                            v-model="form.vehicle_name"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-sub-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddVehicle = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddVehicle: false,
            form: this.getFormData(),
        }
    },
    components: {
        vSelect
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
    props: ['AddVehicleData'],
    watch: {
        AddVehicleData(data){
            this.showModalAddVehicle = true;
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'add-services-sub-btn-modal', 'ADD');
            this.$store.dispatch('vehicle/addVehicle', this.form).then(() => {
                this.$root.btn_load(false, 'add-services-sub-btn-modal', 'ADD');
                this.showModalAddVehicle = false;
                this.form = this.getFormData();
            });
        },
        openAddVehicle(){

        },
        getFormData(){
            return {
                vehicle_name: '',
            }
        },
    },
}
</script>