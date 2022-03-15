<template>
    <tr>
        <td>
            <div style="position:relative;">
                <CInput 
                    v-model="payment.description"
                    v-if="custom"
                />
                <v-select
                    :options="description_option | descriptionFilter"
                    placeholder="Nothing Selected"
                    style="width:100%;"
                    v-else
                    v-model="payment.description"
                >
                <template #option="{ label, type }">
                    <span v-if="type == 'services'">{{ label }}</span>
                    <ul v-else>
                        <li>{{ label }}</li>
                    </ul>
                </template>
                </v-select>
                
                <CLink @click="switchCustom" style="position:absolute; right:0; top:-6px;"><CIcon class="resize-icon" name="cil-pen"/></CLink>
            </div>
        </td>
        <td>
            <CInput 
                v-model="payment.unit_cost"
                type="number"
                min="0"
            />
        </td>
        <td>
            <CInput 
                v-model="payment.qty"
                type="number"
                min="1"
            />
        </td>
        <td>
            <CInput 
                v-model="payment.labor"
                type="number"
                min="0"
            />
        </td>
        <td>
            <CInput 
                :value="total_materials"
                type="number"
                min="0"
                readonly
            />
        </td>
        <td>
            <CButtonGroup>
                <CButton size="sm" @click="newLineTableData" color="primary"><CIcon name="cil-plus"/></CButton>
                <CButton size="sm" @click="removeLineTableData" color="danger"><CIcon name="cil-x"/></CButton>
            </CButtonGroup>
        </td>
    </tr>
</template>
<script>
import vSelect from 'vue-select'

export default {
    props: ['payment', 'item_index', 'description_option'],
    data() {
        return {
            custom: false
        }
    },
    components: {
        vSelect
    },
    watch: {
        total_materials(newVal){
            this.$emit('total_material_change', this.item_index, this.payment, newVal);
        }
    },
    computed:{
        total_materials(){
            return this.payment.unit_cost * this.payment.qty;
        }
    },
    filters: {
        descriptionFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({
                        label: item.services_name, 
                        value: item.id,
                        type: item.type
                    })
                    return option
                }, [])
                return options;
            }
        }
    },
    methods: {
        switchCustom(){
            this.$emit('switch_change', this.item_index, this.payment);
            this.custom = !this.custom;
        },
        newLineTableData(){
            this.$emit('new_line_table_data', 'add');
        },
        removeLineTableData(){
            this.$emit('new_line_table_data', 'remove', this.payment);
        },
    }
}
</script>
<style>
.resize-icon{
    width: 0.8rem !important;
    height: 0.8rem !important;
    font-size: 0.5rem !important;
}
</style>