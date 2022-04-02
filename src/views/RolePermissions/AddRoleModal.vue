<template>
    <CModal
      title="ADD ROLE"
      color="primary"
      :show.sync="showModalAddRole"
      centered
    >
        <CInput
            label="Role Name"
            autocomplete="name"
            v-model="form.role_name"
            invalidFeedback="Role name is required!"
            :value.sync="$v.form.role_name.$model"
            :isValid="checkIfValid('role_name')"
        />
        <div class="form-group">
        <label>Permissions</label>
        <v-select 
            :options="$store.state.roles.role_options | rolesFilter"
            placeholder="Nothing Selected"
            multiple
            v-model="form.permission"
        />
        </div>
        <template #footer>
            <CButton @click="submit" id="btn-add-role" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddRole = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            showModalAddRole: false,
            form: this.getEmptyForm(),
        }
    },
    validations: {
        form: {
            role_name: { required }
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
    props: ['showModalAddRoleData'],
    watch: {
        showModalAddRoleData(){
            this.showModalAddRole = true;
        }
    },
    methods: {
        getEmptyForm(){
            return {
                role_name: '',
                permission: []
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
                this.$root.btn_load(true, 'btn-add-role', 'ADD');
                this.$store.dispatch('roles/addRole', this.form).then(() => {
                    this.$root.btn_load(false, 'btn-add-role', 'ADD');
                    this.showModalAddRole = false;
                    this.form = this.getEmptyForm();
                });
            }
        }
    },
    created(){
        this.$store.dispatch('roles/fetchOptionRoles');
    }
}
</script>