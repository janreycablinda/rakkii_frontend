<template>
    <div :class="getClass()" class="inprogress-item px-3 py-1">
        <div class="ribbon-wrapper">
            <div class="ribbon bg-danger">
                WORKING
            </div>
            <!-- <div class="ribbon bg-success">
                PAID
            </div> -->
        </div>
        <CRow class="mt-2 pt-1">
            <CCol lg="5">
                <small><b>EST-00001</b></small>
                <small><b>CLIENT: </b>{{inprogress_item.name}}</small>
                <p class="m-0"><small><b>UNIT: </b>VIOS</small></p>
                <p class="m-0"><small><b>DATE IN: </b>11/6/2021</small></p>
                <p class="m-0"><small><b>PLATE NO.: NCJ-1111</b></small></p>
                <p class="m-0"><small><b>DATE OUT: </b>12/6/2021</small></p>
            </CCol>
            <CCol lg="7">
                <simple-timeline :items='items'></simple-timeline>
            </CCol>
        </CRow>
        <div class="inprogress-item-action" align="right">
            <CButton size="sm" color="success">
                <CIcon name="cil-check-alt"/>
            </CButton>
            <CButton size="sm" class="ml-1" color="info">
                <CIcon name="cil-arrow-thick-to-right"/>
            </CButton>
            <CButton size="sm" class="ml-1" color="warning">
                <CIcon name="cil-pen"/>
            </CButton>
            <CButton size="sm" class="ml-1" color="secondary">
                <CIcon name="cil-info"/>
            </CButton>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items: []
        }
    },
    props: ['inprogress_item', 'index'],
    watch:{
        inprogress_item(newVal){
            this.items = newVal.items;
        }
    },
    methods: {
        getClass(){
            if(this.index > 0){
                return 'mt-1';
            }
        }
    },
    created(){
        this.items = this.inprogress_item.items;
    }
}
</script>