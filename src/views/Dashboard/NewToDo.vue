<template>
    <CModal
      title="NEW TO DO"
      color="primary"
      :show.sync="showModalNewToDo"
      centered
      
    >
        
            <CRow>
                <CCol lg="12">
                    <CTextarea
                        label="To Do *"
                        autocomplete="name"
                        v-model="todo"
                        required
                        form="ToDoForm"
                        rows="4"
                    />
                </CCol>
            </CRow>
        <template #footer>
            <form id="ToDoForm" v-on:submit.prevent="submit">
                <CButton type="submit" color="primary" class="branding-btn mr-1">ADD</CButton>
                <CButton @click="showModalNewToDo = false" color="danger">Cancel</CButton>
            </form>
        </template>
        
    </CModal>
</template>
<script>
export default {
    data(){
        return {
            showModalNewToDo: false,
            todo: ''
        }
    },
    props: ['showModalDataNewToDo'],
    watch: {
        showModalDataNewToDo(){
            this.showModalNewToDo = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('todo/addToDo', this.todo).then(() => {
                this.todo = '';
                this.showModalNewToDo = false;
            });
        }
    }
    
}
</script>