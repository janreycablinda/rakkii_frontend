<template>
    <CRow class="mb-2" form>
        <CCol lg="7">
            <v-select
            :options="$store.state.expenses_type.expenses_type | expensesFilter"
            placeholder="Select Expenses Type"
            style="width:100%;"
            v-model="expenses.expenses_type_id"
            :reduce="label => label.value"
            >
            <template #list-header>
                <div style="display:flex;">
                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="openAddExpensesType"><CIcon name="cil-plus"/> ADD</a></li>
                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete"><CIcon name="cil-trash"/> DELETE</a></li>
                </div>
            </template>
            </v-select>
        </CCol>
        <CCol lg="4">
            <CInput
            onblur="this.placeholder = 'AMOUNT'" 
            onfocus="this.placeholder = ''" 
            description="AMOUNT"
            v-model="expenses.amount"
            placeholder="AMOUNT">
            <template #prepend-content>₱</template>
            </CInput>
        </CCol>
        <CCol lg="1">
            <CButton @click="deleteExpenses(expenses)" class="mt-1" size="sm" color="danger"><CIcon name="cil-x"/></CButton>
        </CCol>
    </CRow>
</template>
<script>
import vSelect from 'vue-select';
export default {
    components: {
        vSelect
    },
    props: ['expenses'],
    filters: {
        expensesFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.expenses_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    methods: {
        deleteExpenses(data){
            this.$emit('delete_expenses', data);
        },
        openAddExpensesType(){
            this.$emit('add_expenses_type');
        },
        showModalDataDelete(){
            this.$emit('delete_expenses_type', {trigger:new Date(), delete_type: 'EXPENSES TYPE', modal_size:'sm'});
        }
    },
    created(){
        this.$store.dispatch('expenses_type/fetchExpensesType');
    }
}
</script>