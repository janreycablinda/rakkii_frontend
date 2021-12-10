<template>
  <div>
    <strong>{{documents.document_name}}</strong>
    <CInputFile
        v-if="documents.document_name == 'Pictures'"
        @change="uploadDocs"
        multiple
    />
    <CInputFile
        v-else
        @change="uploadDocs"
    />
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
          console.log(files);
          if(this.documents.prefix == 'P'){
              this.$emit('pass_files', this.documents.document_name, this.documents.prefix, files);
          }else{
              this.$emit('pass_files', this.documents.document_name, this.documents.prefix, files[0]);
          }
          
        //   this.documents.files = files[0];
      }
  }
}
</script>
