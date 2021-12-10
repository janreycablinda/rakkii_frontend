<template>
    <CRow>
        <CCol lg="4">
            <CCard>
                <CCardHeader>
                    Profile Picture
                </CCardHeader>
                <CCardBody>
                    <div class="text-center">
                        <img class="c-avatar-img" style="width:60%;" src="/img/upload/blank.png">
                    </div>
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
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
                                :value="this.$store.getters['auth/user'].username"
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
                                :value="this.$store.getters['auth/user'].role"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
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
                email: '',
                name: '',
            }
        }
    },
    created(){
        this.form.email = this.$store.getters['auth/user'].email;
        this.form.name = this.$store.getters['auth/user'].name;
        console.log(this.$store.getters['auth/user']);
    }
}
</script>