<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>ADD CONTRACTS</strong>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <!-- <CCol lg="6">
                        <CInput
                        label="PO No.:"
                        />
                        <CInput
                        label="Place of delivery:"
                        />
                        <CInput
                        type="date"
                        label="Date of delivery:"
                        />
                    </CCol>
                    <CCol lg="6">
                        
                        <CInput
                        type="date"
                        label="Date:"
                        />
                        <CInput
                        label="Mode of Procurement:"
                        />
                    </CCol> -->
                    <CCol lg="6">
                        <CInput
                        label="PO No.:"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                        type="date"
                        label="Date:"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="3">
                        <CInput
                        label="Vehicle:"
                        />
                    </CCol>
                    <CCol lg="3">
                        <CInput
                        label="Plate No.:"
                        />
                    </CCol>
                    <CCol lg="6">
                        <CInput
                        label="Mode of Procurement:"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="3">
                        <CInput
                        label="Place of delivery:"
                        />
                    </CCol>
                    <CCol lg="3">
                        <CInput
                        type="date"
                        label="Date of delivery:"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <table class="custom-table">
                            <tr>
                                <th width="5%">Stock / Property No.</th>
                                <th width="10%">Unit</th>
                                <th width="33%">Description</th>
                                <th width="10%">Vehicle</th>
                                <th width="10%">Plate #</th>
                                <th width="10%">QTY</th>
                                <th width="10%">Unit Cost</th>
                                <th width="10%">Amount</th>
                                <th width="2%">&nbsp;</th>
                                
                            </tr>
                            <tr>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CTextarea></CTextarea>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td align="center">
                                    <CButton style="margin-top:-18px;" size="sm" color="primary"><CIcon name="cil-plus"/></CButton>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CTextarea></CTextarea>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td>
                                    <CInput/>
                                </td>
                                <td align="center">
                                    <CButton style="margin-top:-18px;" size="sm" color="danger"><CIcon name="cil-x"/></CButton>
                                </td>
                            </tr>
                            <tr class="border-top" style="border-color:#4C4C5B !important;">
                                <td>
                                    <b>TOTAL</b>
                                </td>
                                <td colspan="4">
                                    <b>amount <br/>(Amount in words)</b>
                                </td>
                                <td>
                                    <b>Php</b>
                                </td>
                            </tr>
                        </table>
                    </CCol>
                </CRow>
                <CRow class="mt-2">
                    <CCol lg="3">
                        <CInputFile
                            label="Upload Contract File"
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <CButton color="primary">SAVE</CButton>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
import ContractEstimateTable from './ContractEstimateTable'
export default {
    components: {
        ContractEstimateTable
    }
}
</script>