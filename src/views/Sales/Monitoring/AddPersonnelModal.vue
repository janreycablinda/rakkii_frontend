<template>
    <CModal
      title="START WORK"
      color="primary"
      :show.sync="showAddPersonnelModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">ADD PERSONNEL</h5>
    </template>
        <CInput
            type="text"
            v-model="form.name"
            onblur="this.placeholder = 'Name'" onfocus="this.placeholder = ''" description="Name" placeholder="Name"
        />
        <CInput
            type="text"
            v-model="form.address"
            onblur="this.placeholder = 'Address'" onfocus="this.placeholder = ''" description="Address" placeholder="Address"
        />
        <CInput
            type="text"
            v-model="form.phone"
            onblur="this.placeholder = 'Contact No.'" onfocus="this.placeholder = ''" description="Contact No." placeholder="Contact No."
        />
        <v-select
        :options="$store.state.personnel_type.personnel_type | personnelTypeFilter"
        placeholder="Select Position"
        class="style-chooser"
        :reduce="label => label.value"
        label="label"
        v-model="form.personnel_type_id"
        >
        <template #list-header>
            <div style="display:flex;">
                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="addPersonnelTypeData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete({trigger:new Date(), delete_type: 'PERSONNEL TYPE', modal_size:'sm'})"><CIcon name="cil-trash"/> DELETE</a></li>
            </div>
        </template>
        </v-select>
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="showAddPersonnelModal = false" color="danger">Cancel</CButton>
        </template>
        <AddPersonnelTypeModal
        :addPersonnelTypeData="addPersonnelTypeData"
        />
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import AddPersonnelTypeModal from './AddPersonnelTypeModal'

export default {
    data(){
        return {
            showAddPersonnelModal: false,
            addPersonnelTypeData: '',
            form: {
                name: '',
                address: '',
                phone: '',
                personnel_type_id: ''
            }
        }
    },
    components: {
        vSelect,
        AddPersonnelTypeModal
    },
    props: ['addPersonnelData'],
    filters: {
        personnelTypeFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.name, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    watch: {
        addPersonnelData(){
            this.showAddPersonnelModal = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('personnel/addPersonnel', this.form).then(() => {
                this.showAddPersonnelModal = false;
                this.form = {
                    name: '',
                    address: '',
                    phone: '',
                    personnel_type_id: ''
                }
            });
        },
        showModalDataDelete(data){
            this.$emit('child_delete', data);
        },
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showAddPersonnelModal = false;
        }
    },
    created(){
        this.$store.dispatch('personnel/fetchPersonnel')
    }
}
</script>