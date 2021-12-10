<template>
    <CModal
      title="START WORK"
      color="primary"
      :show.sync="showStartModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">START WORK {{header}}</h5>
    </template>
        <CInput
            type="date"
            v-model="form.date_start"
            onblur="this.placeholder = 'Start Date'" onfocus="this.placeholder = ''" description="Start Date" placeholder="Start Date"
        />
        <CInput
            type="date"
            v-model="form.commitment_date"
            onblur="this.placeholder = 'Commitment Date'" onfocus="this.placeholder = ''" description="Commitment Date" placeholder="Commitment Date"
        />
        <v-select
        :options="$store.state.personnel.personnel | personnelFilter"
        placeholder="Select Assign"
        class="style-chooser"
        v-model="form.personnel_id"
        :reduce="label => label.value"
        label="label"
        >
        <template #list-header>
            <li class="hover-pointer" style="text-align: center; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" @click="addPersonnelData = new Date()">ADD PERSONNEL</a></li>
        </template>
        </v-select>
        <CInput
            class="mt-3"
            v-model="form.panels"
            onblur="this.placeholder = 'Panels'" onfocus="this.placeholder = ''" description="Panels" placeholder="Panels"
        />
        <AddPersonnelModal
        :addPersonnelData="addPersonnelData"
        />
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import AddPersonnelModal from './AddPersonnelModal'

export default {
    data(){
        return {
            showStartModal: false,
            addPersonnelData: '',
            header: '',
            form: {
                job_order_id: '',
                timeline_id: '',
                date_start: '',
                personnel_id: '',
                panels: ''
            }
        }
    },
    components: {
        vSelect,
        AddPersonnelModal
    },
    props: ['StartData'],
    filters: {
        personnelFilter(data){
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
        StartData(data){
            this.header = data.timeline_name;
            this.form.job_order_id = data.id;
            this.form.timeline_id = data.timeline_id;
            this.showStartModal = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('job_orders/startWorkingTimeline', this.form).then(() => {
                this.form = {
                    job_order_id: '',
                    timeline_id: '',
                    date_start: '',
                    commitment_date: '',
                    personnel_id: '',
                    panels: ''
                }
                this.showStartModal = false;
                this.$router.replace({
                    name: "Monitoring"
                });
            });
        },
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showStartModal = false;
        }
    },
    created(){
        this.$store.dispatch('personnel/fetchPersonnel');
    }
}
</script>