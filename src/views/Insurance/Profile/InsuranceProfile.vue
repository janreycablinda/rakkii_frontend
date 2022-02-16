<template>
    <div>
        <CRow>
            <CCol lg="3">
                <!-- <CCard>
                    <CCardHeader borderColor="red">Sample Company</CCardHeader>
                </CCard> -->
                <Sidebar/>
            </CCol>
            <CCol lg="9">
                <CCard>
                    <CCardHeader>
                        Insurance Profile
                    </CCardHeader>
                    <CCardBody>
                        <CForm class="mt-3">
                            <CRow class="mt-3">
                                <CCol lg="6">
                                    <CInput
                                        onblur="this.placeholder = 'Insurance'" 
                                        onfocus="this.placeholder = ''"
                                        description="Insurance"
                                        placeholder="Insurance"
                                        v-model="form.insurance_name"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CTextarea
                                        onblur="this.placeholder = 'Address'" 
                                        onfocus="this.placeholder = ''"
                                        description="Address"
                                        placeholder="Address"
                                        v-model="form.address"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CSelect
                                        :value.sync="form.insurance_type"
                                        placeholder="Nothing Selected"
                                        :options="['Private Insurance', 'Third Party Claim', 'GSIS', 'Bidding']"
                                        onblur="this.placeholder = 'Insurance Type'" onfocus="this.placeholder = ''" description="Insurance Type"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CInput
                                        onblur="this.placeholder = 'Contact Person'" 
                                        onfocus="this.placeholder = ''"
                                        description="Contact Person"
                                        placeholder="Contact Person"
                                        v-model="form.contact_person"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CInput
                                        onblur="this.placeholder = 'Contact No.'" 
                                        onfocus="this.placeholder = ''"
                                        description="Contact No."
                                        placeholder="Contact No."
                                        v-model="form.phone"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CInput
                                        onblur="this.placeholder = 'Email'" 
                                        onfocus="this.placeholder = ''"
                                        description="Email"
                                        placeholder="Email"
                                        v-model="form.email"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CInput
                                        onblur="this.placeholder = 'Tin No.:'" 
                                        onfocus="this.placeholder = ''"
                                        description="Tin No.:"
                                        placeholder="Tin No.:"
                                        v-model="form.tin"
                                    />
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCardBody>
                    <CCardFooter align="left">
                        <CButton color="primary">SAVE</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import Sidebar from './Sidebar';

export default {
    components: {
        vSelect,
        Sidebar
    },
    data(){
        return {
            placement: 'top',
            form: {
                insurance_name: '',
                insurance_type: '',
                contact_person: '',
                phone: '',
                email: '',
                address: '',
                tin: '',
            }
        }
    },
    methods: {
        withPopper(dropdownList, component, { width }) {
        /**
         * We need to explicitly define the dropdown width since
         * it is usually inherited from the parent with CSS.
         */
        dropdownList.style.width = width

        /**
         * Here we position the dropdownList relative to the $refs.toggle Element.
         *
         * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
         * the dropdownList overlap by 1 pixel.
         *
         * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
         * wrapper so that we can set some styles for when the dropdown is placed
         * above.
         */
        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: this.placement,
            modifiers: [
            {
                name: 'offset',
                options: {
                offset: [0, -1],
                },
            },
            {
                name: 'toggleClass',
                enabled: true,
                phase: 'write',
                fn({ state }) {
                component.$el.classList.toggle(
                    'drop-up',
                    state.placement === 'top'
                )
                },
            },
            ],
        })

        /**
         * To prevent memory leaks Popper needs to be destroyed.
         * If you return function, it will be called just before dropdown is removed from DOM.
         */
        return () => popper.destroy()
        },
    },
    created(){
        this.form.insurance_name = this.$store.state.insurance_name;
        this.form.insurance_type = this.$store.state.insurance_type;
        this.form.contact_person = this.$store.state.contact_person;
        this.form.phone = this.$store.state.phone;
        this.form.email = this.$store.state.email;
        this.form.address = this.$store.state.address;
        this.form.tin = this.$store.state.tin;
        
    },
}
</script>