<template>
    <CModal
      title="ADD USER"
      color="primary"
      :show.sync="showModalAddUser"
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
        />
        </div>
        <template #footer>
            <CButton @click="submit" id="btn-add-user" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddUser = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            showModalAddUser: false,
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
    props: ['showModalAddUserData'],
    watch: {
        showModalAddUserData(){
            this.showModalAddUser = true;
        }
    },
    methods: {
        getEmptyForm(){
            return {
                name: '',
                username: '',
                email: '',
                password: '',
                role_id: ''
            }
        },
        submit(){
            this.$root.btn_load(true, 'btn-add-user', 'ADD');
            this.$store.dispatch('users/addUser', this.form).then(() => {
                this.$root.btn_load(false, 'btn-add-user', 'ADD');
                this.showModalAddUser = false;
                this.form = this.getEmptyForm();
            });
        }
    },
    created(){
        this.$store.dispatch('roles/fetchRoles');
    }
}
</script>