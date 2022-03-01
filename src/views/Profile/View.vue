<template>
    <CRow>
        <CCol lg="8">
            <CCard>
                <CCardHeader>
                    Personal Information
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                autocomplete="name"
                                v-model="form.name"
                                onblur="this.placeholder = 'Name'" 
                                onfocus="this.placeholder = ''"
                                description="Name" 
                                placeholder="Name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                autocomplete="name"
                                v-model="form.email"
                                onblur="this.placeholder = 'Email'" 
                                onfocus="this.placeholder = ''"
                                description="Email" 
                                placeholder="Email"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                autocomplete="name"
                                readonly
                                onblur="this.placeholder = 'Username'" 
                                onfocus="this.placeholder = ''"
                                description="Username" 
                                placeholder="Username"
                                v-model="form.username"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                autocomplete="name"
                                readonly
                                onblur="this.placeholder = 'Role'" 
                                onfocus="this.placeholder = ''"
                                description="Role" 
                                placeholder="Role"
                                v-model="form.role_name"
                            />
                        </CCol>
                        <CCol>
                            <img v-if="url" :src="url" />
                            <label>Upload Signature</label>
                            <CInputFile
                                @change="uploadDocs($event)"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CButton id="btn-profile-save" @click="submit" color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol lg="4">
            <CCard>
                <CCardHeader>
                    Change Password
                </CCardHeader>
                <CCardBody>
                    <CInput
                        label="Old password"
                        autocomplete="name"
                    />
                    <CInput
                        label="New password"
                        autocomplete="name"
                    />
                    <CInput
                        label="Retype New password"
                        autocomplete="name"
                    />
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
export default {
    data(){
        return {
            form: {
                id:'',
                email: '',
                name: '',
                role_id: '',
                username: '',
                role_name: '',
                signature: ''
            },
            url: ''
        }
    },
    methods: {
        uploadDocs(files){
            console.log(files[0]);
            this.url = URL.createObjectURL(files[0]);

        },
        submit(){
            this.$root.btn_load(true, 'btn-profile-save', 'Save');
            
            this.$store.dispatch('users/updateUser', this.form).then(() => {
                this.$root.btn_load(false, 'btn-profile-save', 'Save');
                this.form = this.getEmptyForm();
            });
        }
    },
    created(){
        this.form.id = this.$store.getters['auth/user'].id;
        this.form.email = this.$store.getters['auth/user'].email;
        this.form.name = this.$store.getters['auth/user'].name;
        this.form.role_id = this.$store.getters['auth/user'].role_id;
        this.form.role_name = this.$store.getters['auth/user'].role.role_name;
        this.form.username = this.$store.getters['auth/user'].username;
    }
}
</script>