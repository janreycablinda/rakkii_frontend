<template>
    <CModal
      title="EDIT USER"
      color="primary"
      :show.sync="showModalEditUser"
      centered
    >
        <CInput
            label="Name"
            autocomplete="name"
            v-model="form.name"
        />
        <CInput
            label="Username"
            autocomplete="name"
            v-model="form.username"
        />
        <CInput
            label="Email"
            autocomplete="name"
            v-model="form.email"
        />
        <CInput
            type="password"
            label="Password"
            autocomplete="name"
            v-model="form.password"
        />
        <div class="form-group">
        <label>Role</label>
        <v-select 
            :options="$store.state.roles.roles | rolesFilter"
            placeholder="Nothing Selected"
            v-model="form.role_id"
            label="label"
            :reduce="label => label.value"
        />
        </div>
        <template #footer>
            <CButton @click="submit" id="btn-update-user" color="primary" class="branding-btn">UPDATE</CButton>
            <CButton @click="showModalEditUser = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            showModalEditUser: false,
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
                    option.push({label: item.role_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    props: ['showModalEditUserData'],
    watch: {
        showModalEditUserData(data){
            console.log(data.data);
            this.form.id = data.data.id;
            this.form.name = data.data.name;
            this.form.username = data.data.username;
            this.form.email = data.data.email;
            this.form.role_id = data.data.role_id;
            this.showModalEditUser = true;
        }
    },
    methods: {
        getEmptyForm(){
            return {
                id: '',
                name: '',
                username: '',
                email: '',
                password: '',
                role_id: ''
            }
        },
        submit(){
            this.$root.btn_load(true, 'btn-update-user', 'UPDATE');
            this.$store.dispatch('users/updateUser', this.form).then(() => {
                this.$root.btn_load(false, 'btn-update-user', 'UPDATE');
                this.showModalEditUser = false;
                this.form = this.getEmptyForm();
            });
        }
    },
    created(){
        this.$store.dispatch('roles/fetchRoles');
    }
}
</script>