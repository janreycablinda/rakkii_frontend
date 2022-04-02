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
            invalidFeedback="Name is required!"
            :value.sync="$v.form.name.$model"
            :isValid="checkIfValid('name')"
        />
        <CInput
            label="Username"
            autocomplete="name"
            v-model="form.username"
            invalidFeedback="Username is required!"
            :value.sync="$v.form.username.$model"
            :isValid="checkIfValid('username')"
        />
        <CInput
            label="Email"
            autocomplete="name"
            v-model="form.email"
            invalidFeedback="Email is required!"
            :value.sync="$v.form.email.$model"
            :isValid="checkIfValid('email')"
        />
        <CInput
            type="password"
            label="Password"
            autocomplete="name"
            v-model="form.password"
            invalidFeedback="Password is required!"
            :value.sync="$v.form.password.$model"
            :isValid="checkIfValid('password')"
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
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            showModalAddUser: false,
            form: this.getEmptyForm(),
        }
    },
    validations: {
        form: {
            name: { required },
            username: { required },
            email: { required },
            password: { required },
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
        checkIfValid(fieldName) {
            let field = this.$v.form[fieldName];
            if (!field.$dirty) return null
            return !(field.$invalid || field.$model === '')
        },
        submit() {
            this.$v.form.$touch()
            if (!this.$v.form.$invalid) {
                this.$root.btn_load(true, 'btn-add-user', 'ADD');
                this.$store.dispatch('users/addUser', this.form)
                .then(() => {
                    this.$root.btn_load(false, 'btn-add-user', 'ADD');
                    this.showModalAddUser = false;
                    this.form = this.getEmptyForm();
                });
            }
        }
    },
    created(){
        this.$store.dispatch('roles/fetchRoles');
    }
}
</script>