<template>
    <CModal
      title="START WORK"
      color="primary"
      :show.sync="showAddPersonnelTypeModal"
      centered
      size="sm"
      :closeOnBackdrop="false"
    >
    <template #header>
        <h5 align="center">ADD PERSONNEL TYPE</h5>
    </template>
        <CInput
            type="text"
            v-model="form.name"
            onblur="this.placeholder = 'Name'" onfocus="this.placeholder = ''" description="Name" placeholder="Name"
        />
        <template #footer>
            <CButton @click="submit" color="primary" class="branding-btn">SUBMIT</CButton>
            <CButton @click="showAddPersonnelTypeModal = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>

export default {
    data(){
        return {
            showAddPersonnelTypeModal: false,
            form: {
                name: ''
            }
        }
    },
    props: ['addPersonnelTypeData'],
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
        addPersonnelTypeData(){
            this.showAddPersonnelTypeModal = true;
        }
    },
    methods: {
        submit(){
            
            this.$store.dispatch('personnel_type/addPersonnelType', this.form).then(() => {
                this.showAddPersonnelTypeModal = false;
            });
        },
        hideCompletedModal(){
            this.$router.replace({
                name: "Monitoring"
            });
            this.showAddPersonnelTypeModal = false;
        }
    },
    created(){
        this.$store.dispatch('personnel_type/fetchPersonnelType');
    }
}
</script>