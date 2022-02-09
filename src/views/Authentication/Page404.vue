<template>
  <div :class="{ 'c-dark-theme': $store.state.darkMode }" class="c-app">
    <CContainer class="d-flex align-items-center min-vh-100">
      <CRow class="w-100 justify-content-center">
        <CCol md="6">
          <div class="w-100">
            <div class="clearfix">
              <h1 class="float-left display-3 mr-4">404</h1>
              <h4 class="pt-3">Oops! You're lost.</h4>
              <p class="text-muted">You are not authorized to access this page.</p>
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page404'
}
</script>
