<template>
    <div>
    <CModal
      title="ADD SERVICES"
      color="primary"
      :show.sync="showModalAddServices"
      centered
      :closeOnBackdrop="false"
    >
            <CForm >
                <CRow>
                    <CCol lg="12">
                        <div class="form-group">
                            <label>Services Type *</label>
                            <v-select 
                                :options="$store.state.services_type.services_type | servicesTypeFilter" 
                                placeholder="Select Services Type"
                                v-model="form.services_type_id"
                                :reduce="label => label.value" 
                                label="label"
                                :isValid="checkIfValid('services_type_id')"
                                :value.sync="$v.form.services_type_id.$model"
                                :class="{ 
                                    'border-red': $v.form.services_type_id.$anyError, 
                                    'border-green': $v.form.services_type_id.required
                                    }"
                            >
                                <template #list-header>
                                    <div style="display:flex;">
                                        <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="openAddServicesType"><CIcon name="cil-plus"/> ADD</a></li>
                                        <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete"><CIcon name="cil-trash"/> DELETE</a></li>
                                    </div>
                                </template>
                            </v-select>
                            <div v-if="$v.form.services_type_id.$anyError == true" 
                                class="invalid-feedback" 
                                style="display:block;">
                                Services Type is required!
                            </div>
                        </div>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="12">
                        <CInput
                            onblur="this.placeholder = 'Services Name *'" 
                            onfocus="this.placeholder = ''" 
                            description="Services Name *" 
                            placeholder="Services Name *"
                            v-model="form.services_name"
                            invalidFeedback="Services name is required!"
                            :value.sync="$v.form.services_name.$model"
                            :isValid="checkIfValid('services_name')"
                        />
                    </CCol>
                </CRow>
            </CForm>
        <template #footer>
            <CButton @click="submit" id="add-services-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddServices = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
    <AddServicesTypeModal
        :AddServicesTypeData="AddServicesTypeData"
        />
    </div>
</template>
<script>
import vSelect from 'vue-select'
import AddServicesTypeModal from './AddServicesTypeModal';
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddServices: false,
            form: this.getFormData(),
            AddServicesTypeData: ''
        }
    },
    validations: {
        form: {
            services_type_id: { required },
            services_name: { required }
        }
    },
    components: {
        vSelect,
        AddServicesTypeModal
    },
    filters: {
        servicesTypeFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.name, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddServicesData'],
    watch: {
        AddServicesData(){
            this.$store.dispatch('services_type/fetchServicesType');
            
            this.showModalAddServices = true;
        }
    },
    methods: {
        checkIfValid(fieldName) {
            let field = this.$v.form[fieldName];
            if (!field.$dirty) return null
            return !(field.$invalid || field.$model === '')
        },
        submit(){
            this.$v.form.$touch()
            if (!this.$v.form.$invalid) {
                this.$root.btn_load(true, 'add-services-btn-modal', 'ADD');
                this.$store.dispatch('services/addServices', this.form)
                .then(() => {
                    this.$root.btn_load(false, 'add-services-btn-modal', 'ADD');
                    this.showModalAddServices = false;
                    this.form = this.getFormData();
                });
            }
        },
        showModalDataDelete(){
            this.$emit('delete_modal', {trigger:new Date(), delete_type: 'SERVICES TYPE', modal_size:'sm'});
        },
        openAddServicesType(){
            this.AddServicesTypeData = new Date();
        },
        getFormData(){
            return {
                services_type_id: '',
                services_name: '',
            }
        },
    },
}
</script>