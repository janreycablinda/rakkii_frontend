<template>
    <CModal
      title="ADD DOCUMENT"
      color="primary"
      :show.sync="showModalAddDocument"
      centered
      :closeOnBackdrop="false"
      size="sm"
    >
        <CForm class="mt-3">
            <CRow>
                <CCol lg="12">
                    <v-select
                            :options="document_type | documentfilter"
                            placeholder="Nothing Selected"
                            style="width:100%;"
                            v-model="form.document_type"
                          >
                        </v-select>
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="12" v-if="form.document_type">
                    <CInputFile
                        v-if="form.document_type.label == 'Pictures'"
                        @change="uploadDocs"
                        multiple
                    />
                    <CInputFile
                        v-else
                        @change="uploadDocs"
                    />
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-document-btn-modal" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddDocument = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'

export default {
    data(){
        return {
            placement: 'bottom',
            showModalAddDocument: false,
            form: this.getFormData(),
            document_type: [
                {
                document_name: 'Vehicle OR/CR',
                prefix: 'VOC'
                },
                {
                document_name: 'Driver’s License w/OR',
                prefix: 'DL'
                },
                {
                document_name: 'Police Report/Affidavit of Accident',
                prefix: 'PR'
                },
                {
                document_name: 'Comprehensive Insurance Policy',
                prefix: 'CIP'
                },
                {
                document_name: 'Pictures',
                prefix: 'P'
                },
                {
                document_name: 'Certificate of No Claim',
                prefix: 'CONC'
                },
                {
                document_name: 'Trip Ticket',
                prefix: 'TT'
                },
                {
                document_name: 'Authorization Letter with Letterhead for government agencies',
                prefix: 'ALG'
                },
                {
                document_name: 'Authorization Letter for individual',
                prefix: 'ALI'
                },
                {
                document_name: 'Request for Quotation',
                prefix: 'RFQ'
                },
                {
                document_name: 'Mayor’s Permit',
                prefix: 'MP'
                },
                {
                document_name: 'PHILGEPS',
                prefix: 'PS'
                },
                {
                document_name: 'Omnibus Sworn Statement',
                prefix: 'OSS'
                },
                {
                document_name: 'Tax Clearance/ITR',
                prefix: 'TC'
                },
            ]
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
    props: ['AddDocumentData'],
    watch: {
        AddDocumentData(data){
            this.form.id = data.data.id;
            this.form.customer_id = data.data.customer_id;
            this.showModalAddDocument = true;
        }
    },
    methods: {
        uploadDocs(files){
            if(this.form.document_type.label == 'Pictures'){
                this.form.files = files;
            }else{
                this.form.files = files[0];
            }

            console.log(this.form)
        },
        submit(){
            let formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('document_type', this.form.document_type.value);
            formData.append('prefix', this.form.document_type.prefix);
            formData.append('customer_id', this.form.customer_id);
        
            if(this.form.document_type.label == 'Pictures'){
                this.form.files.forEach(item => {
                    formData.append('files[]', item);
                })
            }else{
                formData.append('files', this.form.files);
            }

            formData.append('user_id', this.$store.getters['auth/user'].id);
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
            }
          const params = {
              formData: formData,
              config: config,
          }

          this.$root.btn_load(true, 'add-document-btn-modal', 'ADD');
          this.$store.dispatch('document/addJobOrderDocuments', params).then(response => {
              this.$root.btn_load(false, 'add-document-btn-modal', 'ADD');
              this.form = this.getFormData();
              this.showModalAddDocument = false;
              this.$emit('document_added', response);
            //   this.$router.replace({
            //     name: "Estimates"
            //   });
          });
            

        },
        getFormData(){
            return {
                id: '',
                customer_id: '',
                document_type: '',
                files: '',
            }
        },
    },
}
</script>