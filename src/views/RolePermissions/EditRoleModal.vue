<template>
    <CModal
      title="EDIT ROLE"
      color="primary"
      :show.sync="showModalEditRole"
      centered
    >
        <CInput
            label="Role Name"
            autocomplete="name"
            v-model="form.role_name"
        />
        <div class="form-group">
        <label>Permissions</label>
        <v-select 
            :options="$store.state.roles.role_options | rolesFilter"
            placeholder="Nothing Selected"
            multiple
            v-model="form.permission"
            label="label"
            :reduce="label => label.value"
        />
        </div>
        <template #footer>
            <CButton @click="submit" id="btn-update-role" color="primary" class="branding-btn">UPDATE</CButton>
            <CButton @click="showModalEditRole = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            showModalEditRole: false,
            form: this.getEmptyForm(),
        }
    },
    components: {
        vSelect
    },
    filters: {
        rolesFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.title, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    props: ['showModalEditRoleData'],
    watch: {
        showModalEditRoleData(data){
            
            this.form.role_name = data.data.role_name;
            let permission = [];
            data.data.permissions.forEach(item => {
                permission.push(item.permission_id);
            });
            this.form.id = data.data.id;
            this.form.permission = permission;
            this.showModalEditRole = true;
        }
    },
    methods: {
        getEmptyForm(){
            return {
                id: '',
                role_name: '',
                permission: []
            }
        },
        submit(){
            this.$root.btn_load(true, 'btn-update-role', 'UPDATE');
            this.$store.dispatch('roles/updateRole', this.form).then(() => {
                this.$root.btn_load(false, 'btn-update-role', 'UPDATE');
                this.showModalEditRole = false;
                this.form = this.getEmptyForm();
            });
        }
    },
    created(){
        this.$store.dispatch('roles/fetchOptionRoles');
    }
}
</script>