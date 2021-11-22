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
                        Profile
                    </CCardHeader>
                    <CCardBody>
                        <CTabs>
                            <CTab title="Customer Details" active>
                                <CForm class="mt-3">
                                    <CRow>
                                        <CCol lg="6">
                                            <CInput
                                                label="Company Name"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.company_name"
                                            />
                                        </CCol>
                                        <CCol lg="6">
                                            <CTextarea
                                                label="Address"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.address"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol lg="6">
                                            <CInput
                                                label="Phone Number"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.phone"
                                            />
                                        </CCol>
                                        <CCol lg="6">
                                            <CInput
                                                label="Website"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.city"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol lg="6">
                                            <CInput
                                                label="State"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.state"
                                            />
                                        </CCol>
                                        <CCol lg="6">
                                            <CInput
                                                label="Zip Code"
                                                autocomplete="name"
                                                :value="$store.state.customer.profile.zip_code"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol lg="6">
                                            <label>Country</label>
                                            <v-select 
                                                :options="$options.multiselectOptions" 
                                                placeholder="Select country"
                                                append-to-body
                                                :calculate-position="withPopper"
                                            />
                                        </CCol>
                                        
                                    </CRow>
                                </CForm>
                            </CTab>
                            <CTab title="Billing & Shipping">
                                <CForm class="mt-3">
                                    <CRow>
                                        <CCol lg="6">
                                            <CTextarea
                                                label="Street"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="City"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="State"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="Zip Code"
                                                autocomplete="name"
                                            />
                                            <label>Country</label>
                                            <v-select 
                                                :options="$options.multiselectOptions" 
                                                placeholder="Select country"
                                                append-to-body
                                                :calculate-position="withPopper"
                                            />
                                        </CCol>
                                        <CCol lg="6">
                                            <CTextarea
                                                label="Street"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="City"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="State"
                                                autocomplete="name"
                                            />
                                            <CInput
                                                label="Zip Code"
                                                autocomplete="name"
                                            />
                                            <label>Country</label>
                                            <v-select 
                                                :options="$options.multiselectOptions" 
                                                placeholder="Select country"
                                                append-to-body
                                                :calculate-position="withPopper"
                                            />
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CTab>
                        </CTabs>    
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
            placement: 'top'
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
        console.log(this.$route);
    },
    multiselectOptions: [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa', $isDisabled: true },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ]
}
</script>