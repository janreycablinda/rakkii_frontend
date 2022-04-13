<template>
    <CModal
      title="ADD PURCHASE"
      color="primary"
      :show.sync="showModalAddPurchase"
      centered
      :closeOnBackdrop="false"
      size="lg"
    >
        <CForm >
            <CRow class="mt-3">
                <CCol lg="5">
                    <div class="form-group">
                        <label>Item *</label>
                        <v-select
                            :options="$store.state.supplier.supplier  | supplierFilter"
                            placeholder="Select Supplier"
                            class="style-chooser"
                            v-model="form.supplier_id"
                            :isValid="checkIfValid('supplier_id', 'one')"
                            :value.sync="$v.form.supplier_id.$model"
                            :class="{ 
                                'border-red': $v.form.supplier_id.$anyError, 
                                'border-green': $v.form.supplier_id.required
                                }"
                        >
                        <template #list-header>
                            <div style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="$emit('add_supplier', new Date())"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete({trigger:new Date(), delete_type: 'SUPPLIER', modal_size:'lg'})"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                        </template>
                        </v-select>
                        <div v-if="$v.form.supplier_id.$anyError == true" 
                            class="invalid-feedback" 
                            style="display:block;">
                            Supplier is required!
                        </div>
                    </div>
                </CCol>
                <CCol lg="3">
                    <CInput
                        onblur="this.placeholder = 'Date'" 
                        onfocus="this.placeholder = ''" 
                        description="Date" 
                        placeholder="Date"
                        type="date"
                        v-model="form.date"
                        invalidFeedback="Date is required!"
                        :value.sync="$v.form.date.$model"
                        :isValid="checkIfValid('date', 'one')"
                    />
                </CCol>
                <CCol lg="4">
                    <!-- <CInputFile
                        @change="uploadDocs"
                        multiple
                        placeholder="test"
                        
                    /> -->
                    <label class="custom-label" for="upload-photo">{{placeholder}}</label>
                    <input multiple @change="uploadDocs" type="file" name="photo" id="upload-photo" />
                </CCol>
            </CRow>
            <CRow class="mt-3">
                <CCol lg="5">
                    <div class="form-group">
                        <label>Item *</label>
                        <v-select
                            :options="$store.state.item.item | itemFilter"
                            placeholder="Select Item"
                            class="style-chooser"
                            v-model="add_item_form.item_id"
                            :isValid="checkIfValid('item_id', 'two')"
                            :value.sync="$v.add_item_form.item_id.$model"
                            :class="{ 
                                'border-red': $v.add_item_form.item_id.$anyError, 
                                'border-green': $v.add_item_form.item_id.required
                                }"
                        >
                        <template #list-header>
                            <div style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;">
                                    <a style="color:#fff; text-decoration:none;" href="#" @click="$emit('add_item', new Date())"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete({trigger:new Date(), delete_type: 'ITEM', modal_size:'md'})"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                        </template>
                        </v-select>
                        <div v-if="$v.add_item_form.item_id.$anyError == true" 
                            class="invalid-feedback" 
                            style="display:block;">
                            Item is required!
                        </div>
                    </div>
                </CCol>
                <CCol lg="2">
                    <div class="form-group">
                        <label>Unit *</label>
                        <v-select
                            :options="$store.state.unit.unit | unitFilter"
                            placeholder="Select Unit"
                            class="style-chooser"
                            v-model="add_item_form.unit_id"
                            :isValid="checkIfValid('unit_id', 'two')"
                            :value.sync="$v.add_item_form.unit_id.$model"
                            :class="{ 
                                'border-red': $v.add_item_form.unit_id.$anyError, 
                                'border-green': $v.add_item_form.unit_id.required
                                }"
                        >
                        <template #list-header>
                            <div style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;">
                                    <a 
                                        style="color:#fff; text-decoration:none;" 
                                        href="#" 
                                        @click="$emit('add_unit', new Date())"
                                    >
                                        <CIcon name="cil-plus"/> 
                                        ADD
                                    </a>
                                </li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete({trigger:new Date(), delete_type: 'UNIT', modal_size:'sm'})"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                        </template>
                        </v-select>
                        <div v-if="$v.add_item_form.unit_id.$anyError == true" 
                            class="invalid-feedback" 
                            style="display:block;">
                            Unit is required!
                        </div>
                    </div>
                </CCol>
                <CCol lg="2">
                    <CInput
                        onblur="this.placeholder = 'Qty'" 
                        onfocus="this.placeholder = ''" 
                        description="Qty" 
                        placeholder="Qty"
                        v-model="add_item_form.qty"
                        type="number"
                    />
                </CCol>
                <CCol lg="2">
                    <CInput
                        onblur="this.placeholder = 'Price'" 
                        onfocus="this.placeholder = ''" 
                        description="Price" 
                        placeholder="Price"
                        v-model="add_item_form.price"
                        type="number"
                    />
                </CCol>
                <CCol lg="1">
                    <CButton @click="addItem" block color="primary">
                        <CIcon size="sm" name="cil-plus" />
                    </CButton>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12">
                    <table class="customize-table">
                        <tr>
                            <th width="50%">Item</th>
                            <th>Unit</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        <tr v-for="(item, index) in form.items" :key="index">
                            <td>{{item.item}}</td>
                            <td>{{item.unit}}</td>
                            <td>{{item.qty}}</td>
                            <td>₱{{item.price}}</td>
                            <td style="display:flex; justify-content: space-between;">₱{{item.total}} <CLink @click="delItem(item)"><CIcon style="color:red;" name="cil-trash"/></CLink></td>
                        </tr>
                    </table>
                </CCol>
            </CRow>
        </CForm>
        <template #footer>
            <CButton @click="submit" id="add-purchases-btn" color="primary" class="branding-btn">ADD</CButton>
            <CButton @click="showModalAddPurchase = false" color="danger">Cancel</CButton>
        </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import { required } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            placement: 'bottom',
            placeholder: 'Upload Receipt Files',
            showModalAddPurchase: false,
            form: this.getFormData(),
            add_item_form: this.getAddItemFormData()
        }
    },
    validations: {
        add_item_form: {
            item_id: { required },
            unit_id: { required }
        },
        form: {
            supplier_id: { required },
            date: { required }
        }
    },
    components: {
        vSelect
    },
    filters: {
        unitFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.name, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
        supplierFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.supplier_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
        itemFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.product_name + '-' + item.brand, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['AddPurchaseData'],
    watch: {
        AddPurchaseData(data){
            this.form.id = data.data.id;
            this.showModalAddPurchase = true;
        },
        supplier_id(data){
            if(data){
                //
            }else{
                this.item_option = [];
            }
        }
    },
    computed:{
        supplier_id(){
            return this.form.supplier_id;
        }
    },
    methods: {
        checkIfValid(fieldName, type) {
            if (type === 'one') {
                let field = this.$v.form[fieldName];
                if (!field.$dirty) return null
                return !(field.$invalid || field.$model === '')
            } else {
                let field = this.$v.add_item_form[fieldName];
                if (!field.$dirty) return null
                return !(field.$invalid || field.$model === '')
            }
        },
        submit() {
            // const params = {
            //     email: this.form_modal.email,
            //     message: this.form_modal.message,
            //     id: this.form.id
            // }
            this.$v.form.$touch()
            if (!this.$v.form.$invalid) {

                let formData = new FormData();
                formData.append('id', this.form.id);
                formData.append('supplier_id', this.form.supplier_id.value);
                formData.append('date', this.form.date);
                var items = JSON.stringify(this.form.items);
                formData.append('items', items);
                
                if (this.form.files) {
                    this.form.files.forEach(item => {
                        formData.append('files[]', item);
                    })
                }

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                const params = {
                    formData: formData,
                    config: config,
                }

                this.$root.btn_load(true, 'add-purchases-btn', 'ADD');
                this.$store.dispatch('purchase/addPurchases', params).then(response => {
                    this.$root.btn_load(false, 'add-purchases-btn', 'ADD');
                    this.$emit('purchase_added', response);
                    this.form = this.getFormData();
                    this.add_item_form = this.getAddItemFormData();
                    this.showModalAddPurchase = false;
                });
            }
            // this.$root.btn_load(true, 'add-services-type-btn-modal', 'ADD');
            // this.$store.dispatch('services_type/addServicesType', this.form).then(() => {
            //     this.$root.btn_load(false, 'add-services-type-btn-modal', 'ADD');
            //     this.showModalSaveAndSend = false;
            //     this.form = this.getFormData();
            // });
        },
        showModalDataDelete(data){
            this.$emit('child_delete_modal', data)
        },
        uploadDocs(data){
            if(data.target.files.length > 0){
                console.log(data.target.files.length);
                this.placeholder = data.target.files.length + ' files has selected';
                this.form.files = data.target.files;
            }else{
                this.placeholder = 'Upload Receipt Files';
            }
        },
        addItem() {
            this.$v.add_item_form.$touch()
            if (!this.$v.add_item_form.$invalid) {
                const calc = this.add_item_form.qty * this.add_item_form.price;
                this.form.items.push({
                    item: this.add_item_form.item_id.label,
                    item_id: this.add_item_form.item_id.value,
                    unit: this.add_item_form.unit_id.label,
                    unit_id: this.add_item_form.unit_id.value,
                    qty: this.add_item_form.qty,
                    price: this.add_item_form.price,
                    total: calc
                });
                this.add_item_form = this.getAddItemFormData();
                this.$v.add_item_form.$reset()
            }
        },
        delItem(data){
            this.form.items.splice(this.form.items.indexOf(data), 1);
        },
        getFormData(){
            return {
                id: '',
                supplier_id: '',
                date: '',
                files: '',
                items: []
            }
        },
        getAddItemFormData(){
            return {
                item_id: '',
                unit_id: '',
                qty: 0,
                price: 0
            }
        },
    },
    created(){
        this.$store.dispatch('unit/fetchUnit');
        this.$store.dispatch('supplier/fetchSupplier');
        this.$store.dispatch('item/fetchItem');
        
    }
}
</script>
<style>
.custom-label {
   cursor: pointer;
   background:#321FDB;
   color:#fff;
   padding:7px;
   border-radius:5px;
}
.custom-label:hover {
    background:#2D1CC7;
}

#upload-photo {
   opacity: 0;
   position: absolute;
   z-index: -1;
}
</style>