<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="7" sm="12" lg="4" class="text-center">
            <img width="100%" src="/img/upload/logo.png">
            <CCard class="p-4">
              <CCardBody v-if="uploadDone == false">
                <CForm class="text-center" v-if="showUploader">
                  <h1>UPLOADER</h1>
                  <p class="text-muted">Please upload LOA documents here.</p>
                  <CInputFile
                    multiple
                    @change="uploadDocs"
                  />
                  <CRow>
                    <CCol col="12" class="text-center">
                      <CButton @click="submit" color="primary" class="px-4">UPLOAD</CButton>
                    </CCol>
                  </CRow>
                  <small style="color:red;">Note this link is only active for 3 days.</small>
                </CForm>
                <CForm class="text-center" v-else>
                    <h1>LINK IS EXPIRED</h1>
                </CForm>
              </CCardBody>
              <CCardBody v-else>
                <CForm class="text-center">
                    <h1>SUCCESSFULLY UPLOADED</h1>
                </CForm>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Uploader',
  data(){
      return {
          files: '',
          showUploader: false,
          uploadDone: false
      }
  },
  methods: {
      uploadDocs(files){
          console.log(files);
          this.files = files;
      },
      submit(){
        let formData = new FormData();
        formData.append('id', this.$route.params.signature);
        this.files.forEach(file => {
            formData.append('files[]', file);
        });

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        const params = {
            formData: formData,
            config: config,
        }

        this.$store.dispatch('uploader/uploadLoaDocument', params).then(() => {
            this.uploadDone = true;
        });
      }
  },
  created(){
      console.log(this.$route.params.signature)
    const split = this.$route.fullPath.split('/');

    this.$store.dispatch('uploader/checkLink', split[2]).then(response => {
        if(response == 200){
            this.showUploader = true;
        }
    });
  }
}
</script>
