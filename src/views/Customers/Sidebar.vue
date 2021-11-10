<template>
    <CListGroup>
        <CListGroupItem to="/customers/customer-profile/1/profile" active><CIcon height="15" name="cil-user"/> <span>Profile</span></CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-group"/> Contacts</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Billing Statement</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Estimates</CListGroupItem>
        <CListGroupItem to="/customers/customer-profile/1/projects"><CIcon height="15" name="cil-spreadsheet"/> Projects</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-cash"/> Payment</CListGroupItem>
    </CListGroup>
</template>
<script>
export default {
    
}
</script>