<template>
    <CModal
      title="ADD AGENT"
      color="primary"
      :show.sync="showModalAddAgent"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm>
            <CRow class="mt-3">
                <CCol lg="12">
                    <v-select
                    :options="$store.state.item.item | itemFilter"
                    placeholder="Select Item"
                    class="style-chooser"
                    v-model="add_item_form.item_id"
                    >
                    <template #list-header>
                        <div style="display:flex;">
                            <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="$emit('add_item', new Date())"><CIcon name="cil-plus"/> ADD</a></li>
                            <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete({trigger:new Date(), delete_type: 'ITEM', modal_size:'md'})"><CIcon name="cil-trash"/> DELETE</a></li>
                        </div>
                    </template>
                    </v-select>
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Address'" 
                        onfocus="this.placeholder = ''" 
                        description="Address" 
                        placeholder="Address"
                        v-model="form.address"
                    />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInput
                        onblur="this.placeholder = 'Contact No.'" 
                        onfocus="this.placeholder = ''" 
                        description="Contact No." 
                        placeholder="Contact No."
                        v-model="form.contact_no"
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-agent-btn" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddAgent = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select';

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddAgent: false,
            form: this.getFormData(),
        }
    },
    components: {
        vSelect
    },
    props: ['AddAgentData'],
    watch: {
        AddAgentData(data){
            this.showModalAddAgent = true;
        },
    },
    methods: {
        submit(){

            this.$root.btn_load(true, 'add-agent-btn', 'ADD');
            this.$store.dispatch('agent/addAgent', this.form).then(() => {
                this.$root.btn_load(false, 'add-agent-btn', 'ADD');
                this.showModalAddAgent = false;
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
                name: '',
                address: '',
                contact_no: '',
            }
        },
    },
    created(){
        this.$store.dispatch('agent/fetchAgent');
    }
}
</script>