<template>
    <CModal
      title="ADD LOA DOCUMENT"
      color="primary"
      :show.sync="showModalAddLoaDocument"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm class="mt-3">
            <CRow class="mt-3">
                <CCol lg="12">
                    <CInputFile
                        @change="uploadDocs"
                        multiple
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-document-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddLoaDocument = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddLoaDocument: false,
            form: this.getFormData()
        }
    },
    components: {
        vSelect
    },
    filters: {
        documentfilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.document_name, value: item.document_name, prefix: item.prefix})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddLoaDocumentData'],
    watch: {
        AddLoaDocumentData(data){
            this.form.id = data.data.id;
            this.showModalAddLoaDocument = true;
        }
    },
    methods: {
        uploadDocs(files){
            this.form.files = files;
        },
        submit(){
            let formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('user_id', this.$store.getters['auth/user'].id);
            
            this.form.files.forEach(item => {
                formData.append('files[]', item);
            })

            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            const params = {
                formData: formData,
                config: config,
            }

          this.$store.dispatch('document/addLoaDocuments', params).then(response => {
              this.form = this.getFormData();
              this.showModalAddLoaDocument = false;
              this.$emit('document_added', response);
          });
            

        },
        getFormData(){
            return {
                id: '',
                files: '',
            }
        },
    },
}
</script>