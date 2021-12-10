<template>
<div>
  <strong>{{documents.label}}</strong>
  <div style="display:flex">
    
    <CInputFile
        v-if="documents.label == 'Pictures'"
        @change="uploadDocs"
        placeholder="documents.file_name"
        multiple
    />
    <CInputFile
        v-else
        @change="uploadDocs"
        placeholder="documents.file_name"
    />
    <div class="mt-2 mr-5">
        <strong>Uploaded Files</strong><br>
        <span v-for="doc in documents.data" :key="doc.id"><CLink @click="downloadDocs(doc)">{{doc.file_name}}</CLink><br></span>
    </div>
        <!-- <div v-if="documents.length > 0">
            <span v-for="doc in documents" :key="doc.id"><CLink @click="downloadDocs(doc)" class="mt-2">{{doc.file_name}}</CLink><br></span>
        </div>
        <span v-else><CLink @click="downloadDocs(documents)" class="mt-2">{{documents.file_name}}</CLink><br></span> -->
    
  </div>
</div>
</template>
<script>

export default{
  data(){
    return {
      sub_form: []
    }
  },
  props: ['documents'],
  methods: {
      uploadDocs(files){
          console.log(this.documents);
          const split_prefix = this.documents.data[0].file_name.split('-');
          console.log(split_prefix[0]);
          if(this.documents.prefix == 'P'){
              this.$emit('pass_files', this.documents.document_name, this.documents.prefix, files, this.documents.id, this.documents.data);
          }else{
              this.$emit('pass_files', this.documents.document_name, this.documents.prefix, files[0], this.documents.id, this.documents.data);
          }
          
        //   this.documents.files = files[0];
      },
      downloadDocs(data){
            this.$store.dispatch('document/downloadDocument', data.file_name);
        }
  }
}
</script>
