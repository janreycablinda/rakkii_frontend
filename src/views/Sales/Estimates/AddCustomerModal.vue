<template>
    <CModal
      title="ADD CUSTOMER"
      color="primary"
      :show.sync="showModalAddCustomer"
      centered
      size="lg"
      :closeOnBackdrop="false"
    >
       <CTabs>
            <CTab title="Customer Details" active>
                <CForm class="mt-3">
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                autocomplete="name"
                                onblur="this.placeholder = 'Company Name / Name *'" 
                                onfocus="this.placeholder = ''" 
                                description="Company Name / Name *" 
                                placeholder="Company Name / Name *"
                                v-model="form.company_name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CTextarea
                                onblur="this.placeholder = 'Address *'" 
                                onfocus="this.placeholder = ''" 
                                description="Address *" 
                                placeholder="Address *"
                                v-model="form.address"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                onblur="this.placeholder = 'Phone *'" 
                                onfocus="this.placeholder = ''" 
                                description="Phone *" 
                                placeholder="Phone *"
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
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                onblur="this.placeholder = 'Website'" 
                                onfocus="this.placeholder = ''" 
                                description="Website" 
                                placeholder="Website"
                                v-model="form.website"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                onblur="this.placeholder = 'State'" 
                                onfocus="this.placeholder = ''" 
                                description="State" 
                                placeholder="State"
                                v-model="form.state"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            
                            <v-select 
                                :options="$store.state.country.country | countryFilter" 
                                placeholder="Select country"
                                v-model="form.country"
                                :reduce="country => country.label" 
                                label="label"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                onblur="this.placeholder = 'Zip Code'" 
                                onfocus="this.placeholder = ''" 
                                description="Zip Code" 
                                placeholder="Zip Code"
                                v-model="form.zip_code"
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
                                onblur="this.placeholder = 'Street'" 
                                onfocus="this.placeholder = ''" 
                                description="Street" 
                                placeholder="Street"
                                v-model="form_billing.street"
                            />
                            <CInput
                                onblur="this.placeholder = 'City'" 
                                onfocus="this.placeholder = ''" 
                                description="City" 
                                placeholder="City"
                                v-model="form_billing.city"
                            />
                            <CInput
                                onblur="this.placeholder = 'State'" 
                                onfocus="this.placeholder = ''" 
                                description="State" 
                                placeholder="State"
                                v-model="form_billing.state"
                            />
                            <CInput
                                onblur="this.placeholder = 'Zip Code'" 
                                onfocus="this.placeholder = ''" 
                                description="Zip Code" 
                                placeholder="Zip Code"
                                v-model="form_billing.zip_code"
                            />
                            <v-select 
                                :options="$store.state.country.country | countryFilter" 
                                placeholder="Select country"
                                v-model="form_billing.country"
                                :reduce="country => country.label" 
                                label="label"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CTextarea
                                onblur="this.placeholder = 'Street'" 
                                onfocus="this.placeholder = ''" 
                                description="Street" 
                                placeholder="Street"
                                v-model="form_shipping.street"
                            />
                            <CInput
                                onblur="this.placeholder = 'City'" 
                                onfocus="this.placeholder = ''" 
                                description="City" 
                                placeholder="City"
                                v-model="form_shipping.city"
                            />
                            <CInput
                                onblur="this.placeholder = 'State'" 
                                onfocus="this.placeholder = ''" 
                                description="State" 
                                placeholder="State"
                                v-model="form_shipping.state"
                            />
                            <CInput
                                onblur="this.placeholder = 'Zip Code'" 
                                onfocus="this.placeholder = ''" 
                                description="Zip Code" 
                                placeholder="Zip Code"
                                v-model="form_shipping.zip_code"
                            />
                            <v-select 
                                :options="$store.state.country.country | countryFilter" 
                                placeholder="Select country"
                                v-model="form_shipping.country"
                                :reduce="country => country.label" 
                                label="label"
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </CTab>
        </CTabs>
        <template #footer>
            <CButton @click="submit" id="add-customer-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddCustomer = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddCustomer: false,
            form: this.getFormData(),
            form_billing: this.getFormDataBilling(),
            form_shipping: this.getFormDataShipping(),
        }
    },
    components: {
        vSelect
    },
    filters: {
        countryFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.nicename, value: item.nicename})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['showModalAddData'],
    watch: {
        showModalAddData(){
            this.$store.dispatch('country/fetchCountry');
            
            this.showModalAddCustomer = true;
        }
    },
    methods: {
        submit(){
            const params = {
                form: this.form,
                form_billing: this.form_billing,
                form_shipping: this.form_shipping,
            }
            this.$root.btn_load(true, 'add-customer-btn-modal', 'ADD');
            this.$store.dispatch('customer/addCustomer', params).then(() => {
                this.$root.btn_load(false, 'add-customer-btn-modal', 'ADD');
                this.showModalAddCustomer = false;
                this.form = this.getFormData();
                this.form_billing = this.getFormDataBilling();
                this.form_shipping = this.getFormDataShipping();
            });
            

        },
        withPopper(dropdownList, component, { width }) {

        dropdownList.style.width = width

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

        return () => popper.destroy()
        },
        getFormData(){
            return {
                company_name: '',
                phone: '',
                address: '',
                email: '',
                website: '',
                state: '',
                country: '',
                zip_code: ''
            }
        },
        getFormDataBilling(){
            return {
                street: '',
                city: '',
                state: '',
                zip_code: '',
                country: ''
            }
        },
        getFormDataShipping(){
            return {
                street: '',
                city: '',
                state: '',
                zip_code: '',
                country: ''
            }
        },
    },
    multiselectOptions: [
        { value: 'AL', label: 'PARTS TO BE REPLACE' },
        { value: 'AK', label: 'PULLDOWN ALL NEC. PARTS TO GIVEWAY FOR REPAIR' },
        { value: 'AK', label: 'TINSMITH JOB' },
        { value: 'AK', label: 'PAINTING JOB' },
        { value: 'AK', label: 'PAINT MATERIALS' },
    ],
}
</script>