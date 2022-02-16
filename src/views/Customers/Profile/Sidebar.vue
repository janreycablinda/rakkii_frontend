<template>
    <div>
    <h4 align="center">{{$store.state.customer.profile.company_name}}</h4>
    <CListGroup>
        <CListGroupItem :class="activeClass('Customer Profile')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/profile'"><CIcon height="15" name="cil-user"/> <span>Profile</span></CListGroupItem>
        <CListGroupItem :class="activeClass('Customer Documents')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/documents'"><CIcon height="15" name="cil-file"/> Documents</CListGroupItem>
        <!-- <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Billing Statement</CListGroupItem> -->
        <CListGroupItem :class="activeClass('Customer Estimate')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/estimate'"><CIcon height="15" name="cil-spreadsheet"/> Estimates</CListGroupItem>
        <CListGroupItem :class="activeClass('Customer Projects')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/projects'"><CIcon height="15" name="cil-spreadsheet"/> Projects</CListGroupItem>
        <CListGroupItem :class="activeClass('Customer Payments')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/payments'"><CIcon height="15" name="cil-cash"/> Payments</CListGroupItem>
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
            if(this.$route.name == data){
                return 'active';
            }
        }
    },
    created(){
        console.log(this.$route);
        this.$store.dispatch('customer/fetchProfile', this.$route.params.id);
    }
}
</script>