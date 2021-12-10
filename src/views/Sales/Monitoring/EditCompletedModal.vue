<template>
    <CModal
      title="EDIT COMPLETED TIMELINE"
      color="primary"
      :show.sync="showEditCompletedModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">EDIT COMPLETED TIMELINE</h5>
    </template>
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
            type="date"
            v-model="form.date_start"
            onblur="this.placeholder = 'Start Date'"
            onfocus="this.placeholder = ''"
            description="Start Date"
            placeholder="Start Date"
        />
        <CInput
            type="date"
            v-model="form.commitment_date"
            onblur="this.placeholder = 'Commitment Date'"
            onfocus="this.placeholder = ''"
            description="Commitment Date"
            placeholder="Commitment Date"
        />
        <CInput
            type="date"
            v-model="form.date_done"
            onblur="this.placeholder = 'Date Done'"
            onfocus="this.placeholder = ''"
            description="Date Done"
            placeholder="Date Done"
        />
        <CInput
            v-model="form.panels"
            onblur="this.placeholder = 'Panels'"
            onfocus="this.placeholder = ''"
            description="Panels"
            placeholder="Panels"
        />
        <CTextarea
            v-model="form.remarks"
            onblur="this.placeholder = 'Remarks'"
            onfocus="this.placeholder = ''"
            description="Remarks"
            placeholder="Remarks"
        />
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">UPDATE</CButton>
            <CButton @click="hideCompletedModal" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
export default {
    data(){
        return {
            showEditCompletedModal: false,
            form: {
                date_start: '',
                commitment_date: '',
                date_done: '',
                personnel_id: '',
                panels: '',
                remarks: '',
            }
        }
    },
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
    components: {
        vSelect
    },
    props: ['EditCompletedModalData'],
    watch: {
        EditCompletedModalData(data){
            this.$store.dispatch('job_orders/findTimeline', data.timeline_id).then(response => {
                console.log(response);
                this.form = response;
            });
            this.showEditCompletedModal = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('job_orders/updateTimeline', this.form).then(() => {
                this.form = [];
                this.showEditCompletedModal = false;
                this.$router.replace({
                    name: "Monitoring"
                });
            });
        },
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showEditCompletedModal = false;
        }
    },
    created(){
        this.$store.dispatch('personnel/fetchPersonnel');
    }
}
</script>