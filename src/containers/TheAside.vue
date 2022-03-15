<template>
  <CSidebar
    aside
    :show="$store.state.asideShow"
    @update:show="(val) => $store.commit('set', ['asideShow', val])"
    colorScheme="light"
    overlaid
    size="lg"
  >
    <CSidebarClose @click.native="$store.commit('toggle', 'asideShow')"/>
    <CTabs tabs class="nav-underline nav-underline-primary custom-tabs">
      <CTab active>
        <template slot="title">
          <CIcon name="cil-settings"/>
        </template>
        <div class="p-3">
          <h6>Estimator Signature</h6>
          <div>
            <img class="signature-img mb-1" src="/img/upload/signature.png"/>
            <CInputFile/>
            <CInput 
              onblur="this.placeholder = 'Estimator Name'" 
              onfocus="this.placeholder = ''" 
              description="Estimator Name" 
              placeholder="Estimator Name"
            />
          </div>
          <hr style="border:#321FDB 1px solid;">
          <h6>Estimate Approval Signature</h6>
          <div>
            <img class="signature-img mb-1" src="/img/upload/signature.png"/>
            <CInputFile/>
            <CInput 
              onblur="this.placeholder = 'Estimator Name'" 
              onfocus="this.placeholder = ''" 
              description="Estimator Name" 
              placeholder="Estimator Name"
            />
            <CInput 
              onblur="this.placeholder = 'POSITION'" 
              onfocus="this.placeholder = ''" 
              description="POSITION" 
              placeholder="POSITION"
            />
          </div>
          <hr style="border:#321FDB 1px solid;">
          <h6>Estimate Signature</h6>
          <div>
            <img class="signature-img mb-1" src="/img/upload/signature.png"/>
            <CInputFile/>
            <CInput 
              onblur="this.placeholder = 'Estimator Name'" 
              onfocus="this.placeholder = ''" 
              description="Estimator Name" 
              placeholder="Estimator Name"
            />
          </div>
          <CButton size="sm" color="primary">SAVE</CButton>
        </div>
        
      </CTab>
      
    </CTabs>
  </CSidebar>
</template>

<script>
export default {
  name: 'TheAside',
  methods: {
    saveSettings(){
      alert('test');
    }
  }
}
</script>
<style>
.custom-tabs .tab-content{
  height:600px;
  position:relative;
  margin-bottom:50px;
  overflow: scroll;
}

.signature-img{
  border: solid #D8DBE0 1px;
  width: 100%;
}
</style>
