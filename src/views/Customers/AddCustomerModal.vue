<template>
    <CModal
      title="ADD CUSTOMER"
      color="primary"
      :show.sync="showModalAddCustomer"
      centered
      size="lg"
    >
       <CTabs>
            <CTab title="Customer Details" active>
                <CForm class="mt-3">
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                label="Company Name / Name*"
                                autocomplete="name"
                               
                            />
                        </CCol>
                        <CCol lg="6">
                            <CTextarea
                                label="Address *"
                                autocomplete="name"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                label="Contact Number *"
                                autocomplete="name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                label="Email"
                                autocomplete="name"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                label="Website"
                                autocomplete="name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                label="State"
                                autocomplete="name"
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
                        <CCol lg="6">
                            <CInput
                                label="Zip Code"
                                autocomplete="name"
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
        <template #footer>
            <CButton @click="showModalAddCustomer = false" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddCustomer = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalAddCustomer: false
        }
    },
    props: ['showModalAddData'],
    watch: {
        showModalAddData(){
            this.showModalAddCustomer = true;
        }
    },
    
}
</script>