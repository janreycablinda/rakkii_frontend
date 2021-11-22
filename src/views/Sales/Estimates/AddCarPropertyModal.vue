<template>
    <CModal
      title="ADD CAR PROPERTY"
      color="primary"
      :show.sync="showModalAddCarProperty"
      centered
      :closeOnBackdrop="false"
    >
            <CForm >
                
                <CRow>
                    <CCol lg="12">
                        <span><strong>Customer Name:</strong> {{form.label}}</span>
                    </CCol>
                </CRow>  
                <CRow class="mt-3">
                    <CCol lg="12">
                        <v-select 
                            :options="$store.state.vehicle.vehicle | vehicleFilter" 
                            placeholder="Select Vehicle"
                            v-model="form.vehicle_id"
                            :reduce="label => label.value" 
                            label="label"
                        >
                            <template #list-header>
                                <li style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" @click="AddVehicleData = new Date()" href="#">ADD VEHICLE</a></li>
                            </template>
                        </v-select>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="12">
                        <CInput
                            onblur="this.placeholder = 'Plate No.'" 
                            onfocus="this.placeholder = ''"
                            description="Plate No." 
                            placeholder="Plate No."
                            v-model="form.plate_no"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-sub-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddCarProperty = false" color="danger">Cancel</CButton>
        </template>
        <AddVehicleModal
        :AddVehicleData="AddVehicleData"
        />
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import AddVehicleModal from './AddVehicleModal';

export default {
    data(){
        return {
            placement: 'bottom',
            AddVehicleData: '',
            showModalAddCarProperty: false,
            form: this.getFormData(),
        }
    },
    components: {
        vSelect,
        AddVehicleModal
    },
    filters: {
        vehicleFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.vehicle_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddCarPropertyData'],
    watch: {
        AddCarPropertyData(data){
            this.form.customer_id = data.data.value;
            this.form.label = data.data.label;
            this.showModalAddCarProperty = true;
            this.$store.dispatch('vehicle/fetchVehicle');
        }
    },
    methods: {
        submit(){
            this.$root.btn_load(true, 'add-services-sub-btn-modal', 'ADD');
            this.$store.dispatch('property/addProperty', this.form).then(() => {
                this.$root.btn_load(false, 'add-services-sub-btn-modal', 'ADD');
                this.showModalAddCarProperty = false;
                this.form = this.getFormData();
            });
        },
        
        getFormData(){
            return {
                customer_id: '',
                label: '',
                vehicle_id: '',
                plate_no: '',
            }
        },
    },
}
</script>