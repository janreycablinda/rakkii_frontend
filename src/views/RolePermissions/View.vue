<template>
    <CRow>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CButton v-if="$ability.can('create', 'Users, Roles & Permissions')" @click="showModalAddUserData = new Date()" size="sm" color="primary">ADD USER</CButton>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mt-2">
                        <CCol lg="12">
                            <UsersTable
                            :items="$store.state.users.users"
                            v-on:event_child="childActionUser"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CButton size="sm" @click="showModalAddRoleData = new Date()" color="primary">ADD ROLE</CButton>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mt-2">
                        <CCol lg="12">
                            <RolePermissionTable
                            :items="$store.state.roles.roles"
                            v-on:event_child="TableAction"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <AddRoleModal
        :showModalAddRoleData="showModalAddRoleData"
        />
        <EditRoleModal
        :showModalEditRoleData="showModalEditRoleData"
        />
        <AddUserModal
        :showModalAddUserData="showModalAddUserData"
        />
        <EditUserModal
        :showModalEditUserData="showModalEditUserData"
        />
    </CRow>
</template>
<script>
import RolePermissionTable from './RolePermissionTable'
import UsersTable from './UsersTable'
import AddRoleModal from './AddRoleModal';
import EditRoleModal from './EditRoleModal';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

export default {
    data(){
        return {
            showModalAddRoleData: '',
            showModalEditRoleData: '',
            showModalAddUserData: '',
            showModalEditUserData: ''
        }
    },
    components: {
        RolePermissionTable,
        UsersTable,
        AddRoleModal,
        EditRoleModal,
        AddUserModal,
        EditUserModal
    },
    methods: {
        TableAction(data, action){
            if(action == 'edit'){
                this.showModalEditRoleData = {
                    trigger: new Date(),
                    data: data
                }
            }
            
        },
        childActionUser(data, action){
            if(action == 'edit'){
                this.showModalEditUserData = {
                    trigger: new Date(),
                    data: data
                }
            }
            
        },
    },
    created(){
        this.$store.dispatch('users/fetchUsers');
        this.$store.dispatch('roles/fetchRoles');
    }
}
</script>