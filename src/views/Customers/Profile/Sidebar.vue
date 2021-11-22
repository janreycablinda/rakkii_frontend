<template>
    <div>
    <h4 align="center">{{$store.state.customer.profile.company_name}}</h4>
    <CListGroup>
        <CListGroupItem :class="activeClass" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/profile'" active><CIcon height="15" name="cil-user"/> <span>Profile</span></CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-group"/> Contacts</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Billing Statement</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Estimates</CListGroupItem>
        <CListGroupItem :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/projects'"><CIcon height="15" name="cil-spreadsheet"/> Projects</CListGroupItem>
        <CListGroupItem href="#"><CIcon height="15" name="cil-cash"/> Payment</CListGroupItem>
    </CListGroup>
    </div>
</template>
<script>
export default {
    // watch:{
    //     $route (to, from){
    //         alert('test');
    //     }
    // },
    methods: {
        activeClass(data){

        }
    },
    created(){
        console.log(this.$route);
        this.$store.dispatch('customer/fetchProfile', this.$route.params.id);
    }
}
</script>