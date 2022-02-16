<template>
    <div>
    <h4 align="center">{{$store.state.insurance.insurance_profile.insurance_name}}</h4>
    <CListGroup>
        <CListGroupItem :class="activeClass('Insurance Profile')" :to="'/insurance/insurance-profile/:id/profile' + $store.state.customer.profile.id + '/profile'"><CIcon height="15" name="cil-user"/> <span>Profile</span></CListGroupItem>
        <!-- <CListGroupItem :class="activeClass('Customer Documents')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/documents'"><CIcon height="15" name="cil-file"/> Documents</CListGroupItem> -->
        <!-- <CListGroupItem href="#"><CIcon height="15" name="cil-spreadsheet"/> Billing Statement</CListGroupItem> -->
        <!-- <CListGroupItem :class="activeClass('Customer Estimate')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/estimate'"><CIcon height="15" name="cil-spreadsheet"/> Estimates</CListGroupItem>
        <CListGroupItem :class="activeClass('Customer Projects')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/projects'"><CIcon height="15" name="cil-spreadsheet"/> Projects</CListGroupItem>
        <CListGroupItem :class="activeClass('Customer Payments')" :to="'/customers/customer-profile/' + $store.state.customer.profile.id + '/payments'"><CIcon height="15" name="cil-cash"/> Payments</CListGroupItem> -->
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
        
        this.$store.dispatch('insurance/fetchInsuranceProfile', this.$route.params.id);
    }
}
</script>