<template>
    <div>
        <CCard>
            <CCardHeader>
                <strong>Job Order</strong>
                <div class="card-header-actions">
                    <strong>JO-000{{form.job_order_no}}</strong>
                </div>
            </CCardHeader>
            <CCardBody>
                <CMedia>
                <CRow>
                    <CCol lg="6">
                      <div class="inline form-group">
                          <label>Customer</label>
                          <v-select
                            :options="$store.state.customer.customer | customerFilter"
                            placeholder="Select Customer"
                            class="style-chooser"
                            :reduce="label => label.value"
                            label="label"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            v-model="form.customer_id"
                          >
                          <template #open-indicator="{ attributes }">
                            &nbsp;
                          </template>
                          <template #spinner="{ loading }">
                          <div
                            v-if="true"
                          >
                            🔍
                          </div>
                          </template>
                          <template #footer>
                            <small class="form-text text-muted w-100">Customer</small>
                          </template>
                          <template #list-header>
                            <div style="display:flex;">
                              <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalAddData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                              <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'CUSTOMER', modal_size:'lg'}"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                          </template>
                          </v-select>
                      </div>

                    </CCol>
                    <CCol lg="3">
                        <div class="inline form-group">
                          <label>Agent</label>
                          <v-select
                            :options="$store.state.agent.agent | agentFilter"
                            placeholder="Nothing Selected"
                            class="style-chooser"
                            :reduce="label => label.value"
                            label="label"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            v-model="form.agent_id"
                          >
                          <template #open-indicator="{ attributes }">
                            &nbsp;
                          </template>
                          <template #spinner="{ loading }">
                          <div
                            v-if="true"
                          >
                            🔍
                          </div>
                          </template>
                          <template #footer>
                            <small class="form-text text-muted w-100">Agent</small>
                          </template>
                          <template #list-header>
                            <div style="display:flex;">
                            <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddAgentData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                            <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#"  @click="showModalDataDelete = {trigger:new Date(), delete_type: 'AGENT', modal_size:'md'}"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                          </template>
                          </v-select>
                      </div>
                    </CCol>
                    <CCol lg="3">
                        <CInput v-model="form.date" onblur="this.placeholder = 'Date'" onfocus="this.placeholder = ''" description="Date" placeholder="Date" type="datetime-local"/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="6">
                        <div class="form-group">
                          <label>Vehicle</label>
                          <v-select
                            :options="$store.state.property.property | propertyFilter"
                            placeholder="Select Vehicle"
                            class="style-chooser"
                            append-to-body
                            :calculate-position="withPopper"
                            style="width:100%;"
                            v-model="form.vehicle_id"
                            :reduce="label => label.value"
                            label="label"
                          >
                          <template #list-header>
                              <div style="display:flex;">
                                <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="addCarProperty(form.customer_id)"><CIcon name="cil-plus"/> ADD</a></li>
                                <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'PROPERTY', customer_id: {value:form.customer_id}, modal_size:'md'}"><CIcon name="cil-trash"/> DELETE</a></li>
                              </div>
                          </template>
                          </v-select>
                        </div>
                    </CCol>
                    <CCol lg="6">
                      <div class="form-group">
                        <label>Insurance</label>
                        <v-select
                          :options="$store.state.insurance.insurance | insuranceFilter"
                          placeholder="Select Insurance"
                          class="style-chooser"
                          append-to-body
                          :calculate-position="withPopper"
                          style="width:100%;"
                          v-model="form.insurance"
                          :reduce="label => label.value"
                          label="label"
                        >
                        <template #list-header>
                            <div style="display:flex;">
                              <li style="text-align: center; width:50%; background:#3C4B64;"><a style="color:#fff; text-decoration:none;" href="#" @click="AddInsuranceData = new Date()"><CIcon name="cil-plus"/> ADD</a></li>
                              <li style="text-align: center; width:50%; background:#E55353;"><a style="color:#fff; text-decoration:none;" href="#" @click="showModalDataDelete = {trigger:new Date(), delete_type: 'INSURANCE', modal_size:'lg'}"><CIcon name="cil-trash"/> DELETE</a></li>
                            </div>
                        </template>
                        </v-select>
                      </div>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                    <CCol lg="6">
                        <!-- <CInput v-if="$store.state.estimate.estimate" readonly :placeholder="'EST-000' + ($store.state.estimate.estimate.at(-1).id+1)"/> -->
                    </CCol>
                    <!-- <CCol lg="6">
                        <CInput v-model="form.insurance" onblur="this.placeholder = 'Insurance'" onfocus="this.placeholder = ''" placeholder="Insurance" description="Insurance"/>
                    </CCol> -->
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <table class="custom-table">
                            <tr>
                                <th width="80%">SCOPE OF WORK</th>
                                <th width="10%">LABOR</th>
                                <th width="10%">PARTS</th>
                            </tr>
                          <div style="width:125%;"  class="mt-2">
                            <ol class="c" >
                              <li v-for="(serv, index) in form.services" :key="index">
                                <!-- <Services
                                v-on:child_data="child_action"
                                :services="serv"
                                v-on:child_services="openAddServices"
                                v-on:child_add_sub_services="childAddSubServices"
                                v-on:child_sub_services_changes="childSubChanges"
                                /> -->
                                <Services
                                v-on:child_data="child_action"
                                :trigger_add_sub="trigger_add_sub"
                                :trigger_delete_sub="trigger_delete_sub"
                                :services="serv"
                                v-on:child_services="openAddServices"
                                v-on:child_add_sub_services="childAddSubServices"
                                v-on:child_sub_services_changes="childSubChanges"
                                v-on:child_delete_services="deleteModal"
                                />
                              </li>
                            </ol>
                          </div>
                          <tr>
                            <td align="right">
                              SUB-TOTAL:
                            </td>
                            <td class="bordered-left bordered-top bordered-bottom">
                              ₱{{sub_total_labor}}
                            </td>
                            <td class="bordered-left bordered-top">
                              ₱{{sub_total_parts}}
                            </td>
                          </tr>
                          <tr>
                            <td align="right">
                              12% VAT:
                            </td>
                            <td class="bordered-left bordered-bottom">
                              ₱{{total_vat}}
                            </td>
                            <td class="bordered-left bordered-top">

                            </td>
                          </tr>
                          <tr>
                            <td align="center" class="bordered-top">
                              <strong>TOTAL LABOR AND PARTS</strong>
                            </td>
                            <td class="bordered-left bordered-right">
                              ₱{{total_labor_parts}}
                            </td>
                            <td>

                            </td>
                          </tr>
                        </table>
                    </CCol>
                </CRow>
                <CRow class="mt-3">
                  <CCol lg="7">
                    <CRow class="m-1 bordered">
                      <CCol lg="12" align="center">
                        <h5>PURCHASED ITEMS</h5>
                        <CButton @click="AddPurchaseData = {trigger: new Date(), data: form}" style="position:absolute; top: 3px; right:15px;" color="primary" size="sm"><CIcon name="cil-plus"/></CButton>
                      </CCol>
                      <CCol lg="12">
                        <!-- <table class="custom-table mt-2 mb-2">
                          <tr>
                            <th width="32%">
                              Purchase Item
                            </th>
                            <th width="20%">
                              Supplier
                            </th>
                            <th width="12%">
                              Date
                            </th>
                            <th width="4%">
                              Qty
                            </th>
                            <th width="10%">
                              Price
                            </th>
                            <th width="10%">
                              Total
                            </th>
                            <th width="10%">
                              
                            </th>
                          </tr>
                          <tr v-for="purchase in purchase_items" :key="purchase.item_id">
                            <td>
                              {{purchase.item.product_name}} {{purchase.item.brand}}
                            </td>
                            <td>
                              {{purchase.supplier.supplier_name}}
                            </td>
                            <td>
                              {{purchase.date}}
                            </td>
                            <td>
                              {{purchase.qty}}
                            </td>
                            <td>
                              ₱{{purchase.price}}
                            </td>
                            <td>
                              ₱{{purchase.qty * purchase.price}}
                            </td>
                            <td align="right">
                              <CLink @click="editItem(purchase.item_id)"><CIcon name="cil-pen"/></CLink>
                              <CLink @click="deleteItem(purchase)" style="color:red;"><CIcon name="cil-trash"/></CLink>
                            </td>
                          </tr>
                          <tr>
                            <td>

                            </td>
                            <td colspan="4" align="right">
                              Total Amount Purchased:
                            </td>
                            <td colspan="2" align="left">
                              ₱{{ totalPurchased }}
                            </td>
                          </tr>
                        </table> -->
                        <PurchaseTable
                        :items="purchase_items"
                        v-on:purchase_added="purchaseAdded"
                        v-on:edit_purchase="editPurchase"
                        />
                        <span><b>Total Purchase:</b> ₱{{totalPurchased}}</span>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol lg="5">
                      <CRow class="m-1 bordered">
                        <CCol lg="12" align="center">
                          <h5>APPROVED BUDGET</h5>
                        </CCol>
                        <CCol lg="12" class="mt-2">
                          <CInput 
                          v-model="payment_form.total_repair_cost" 
                          onblur="this.placeholder = 'Total Repair Cost'" 
                          onfocus="this.placeholder = ''" 
                          description="Total Repair Cost" 
                          placeholder="Total Repair Cost">
                          <template #prepend-content>₱</template>
                          </CInput>
                        </CCol>
                        <CCol lg="12">
                          <CInput 
                          v-model="payment_form.policy_deductible" 
                          onblur="this.placeholder = 'Less: Policy Deductible'" 
                          onfocus="this.placeholder = ''" 
                          description="Less: Policy Deductible" 
                          placeholder="Less: Policy Deductible">
                          <template #prepend-content>₱</template>
                          </CInput>
                        </CCol>
                        <CCol lg="12">
                          <CInput 
                          v-model="payment_form.betterment" 
                          onblur="this.placeholder = 'Betterment'" 
                          onfocus="this.placeholder = ''" 
                          description="Betterment" 
                          placeholder="Betterment">
                          <template #prepend-content>₱</template>
                          </CInput>
                        </CCol>
                        <CCol lg="12">
                          <CInput 
                          v-model="payment_form.discount" 
                          onblur="this.placeholder = 'Discount'" 
                          onfocus="this.placeholder = ''" 
                          description="Discount" 
                          placeholder="Discount">
                          <template #prepend-content>₱</template>
                          </CInput>
                        </CCol>
                        <CCol lg="12">
                          <CInput 
                          readonly 
                          :value="payment_form.net" 
                          onblur="this.placeholder = 'NET'" 
                          onfocus="this.placeholder = ''" 
                          description="NET"
                          placeholder="NET">
                          <template #prepend-content>₱</template>
                          </CInput>
                        </CCol>
                      </CRow>
                      <CRow class="m-1 bordered">
                        <CCol lg="12" align="center">
                          <h5>OTHER PROJECT EXPENSES</h5>
                          <CButton @click="AddOtherExpenses" style="position:absolute; top: 3px; right:11px;" color="primary" size="sm"><CIcon name="cil-plus"/></CButton>
                        </CCol>
                        <CCol lg="12" class="mt-2">
                          <Expenses 
                          v-for="(expenses, index) in other_expenses"
                          v-on:delete_expenses="deleteExpenses"
                          v-on:add_expenses_type="addExpenses"
                          :key="index" 
                          :expenses="expenses"
                          v-on:delete_expenses_type="deleteExpensesType"
                          />
                          <span><b>Total Project Expenses:</b> ₱{{totalExpenses}}</span>
                        </CCol>
                      </CRow>
                  </CCol>
                </CRow>
              <CRow class="mt-3">
                <CCol lg="12">
                  <CButton @click="submit" color="success">UPDATE</CButton>
                </CCol>
              </CRow>
              </CMedia>
              <CElementCover v-if="media" :opacity="0.9"/>
            </CCardBody>
        </CCard>
        <AddCustomerModal
        :showModalAddData="showModalAddData"
        />
        <AddServicesModal
        :AddServicesData="AddServicesData"
        v-on:delete_modal="deleteModalShow"
        />
        <AddSubServicesModal
         v-on:child_add_subservices="addSubServices"
        :AddSubServicesData="AddSubServicesData"
        />
        <AddCarPropertyModal
        :AddCarPropertyData="AddCarPropertyData"
        />
        <SubmitApprovalModal
        :AddSaveAndSendData="AddSaveAndSendData"
        />
        <AddInsuranceModal
        :AddInsuranceData="AddInsuranceData"
        />
        <AddAgentModal
        :AddAgentData="AddAgentData"
        />
        <AddPurchaseModal
        :AddPurchaseData="AddPurchaseData"
        v-on:add_supplier="addSupplier"
        v-on:add_item="addItem"
        v-on:purchase_added="purchaseAdded"
        v-on:child_delete_modal="deleteModalShow"
        v-on:add_unit="addUnit"
        />
        <EditPurchaseModal
        :EditPurchaseData="EditPurchaseData"
        v-on:add_supplier="addSupplier"
        v-on:add_item="addItem"
        v-on:purchase_added="purchaseAdded"
        v-on:child_delete_modal="deleteModalShow"
        v-on:add_unit="addUnit"
        v-on:purchase_updated="purchaseUpdated"
        />
        <AddSupplierModal
        :AddSupplierData="AddSupplierData"
        />
        <ModalDelete
        :showModalDataDelete="showModalDataDelete"
        />
        <AddItemModal
        :AddItemData="AddItemData"
        />
        <AddExpensesType
        :AddExpensesTypeData="AddExpensesTypeData"
        />
        <AddUnitModal
        :AddUnitData="AddUnitData"
        />
        
    </div>
</template>
<script>
import vSelect from 'vue-select';
import { createPopper } from '@popperjs/core';
import Services from '../Estimates/EditServices';
import AddCustomerModal from '../Estimates/AddCustomerModal';
import AddServicesModal from '../Estimates/AddServicesModal';
import AddSubServicesModal from '../Estimates/AddSubServicesModal';
import AddCarPropertyModal from '../Estimates/AddCarPropertyModal';
import SubmitApprovalModal from '../Estimates/SubmitApprovalModal';
import AddInsuranceModal from '../Estimates/AddInsuranceModal';
import AddAgentModal from './AddAgentModal';
import AddPurchaseModal from './AddPurchaseModal';
import AddSupplierModal from '../../Supplier/AddSupplierModal';
import ModalDelete from '../../DeleteModal/View';
import AddItemModal from './AddItemModal';
import PurchaseTable from './PurchaseTable';
import Expenses from './Expenses';
import AddExpensesType from './AddExpensesType';
import AddUnitModal from './AddUnitModal';
import EditPurchaseModal from './EditPurchaseModal';

export default {
    data(){
      return {
        showModalAddData: '',
        AddServicesData: '',
        EditPurchaseData: '',
        AddAgentData: '',
        AddSubServicesData: '',
        AddPurchaseData: '',
        AddUnitData: '',
        AddSaveAndSendData: '',
        showModalDataDelete: '',
        AddCarPropertyData: '',
        AddInsuranceData: '',
        AddItemData: '',
        AddSupplierData: '',
        AddExpensesTypeData: '',
        placement: 'bottom',
        trigger_add_sub: '',
        trigger_delete_sub: '',
        media: true,
        form: {
          id: '',
          job_order_no: '',
          customer_id: '',
          agent_id: '',
          date: '',
          insurance: '',
          insurance_type: '',
          vehicle_id: '',
          services: [
            {
            services_id: '',
            labor_fee: 0,
            parts_fee: 0,
            sub_services: []
            }
          ],
        },
        purchase_items: [],
        payment_form: {
          total_repair_cost: 0,
          policy_deductible: 0,
          betterment: 0,
          discount: 0,
          net: 0
        },
        other_expenses: []
      }
    },
    components: {
        vSelect,
        Services,
        AddCustomerModal,
        AddServicesModal,
        AddSubServicesModal,
        AddCarPropertyModal,
        SubmitApprovalModal,
        AddInsuranceModal,
        AddAgentModal,
        AddPurchaseModal,
        AddSupplierModal,
        ModalDelete,
        AddItemModal,
        PurchaseTable,
        Expenses,
        AddExpensesType,
        AddUnitModal,
        EditPurchaseModal
    },
    filters: {
      customerFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.company_name, value: item.id})
                return option
            }, [])
            return options;
        }
      },
      agentFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.name, value: item.id})
                return option
            }, [])
            return options;
        }
      },
      insuranceFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.insurance_name, insurance_type:item.insurance_type, value: item.id})
                return option
            }, [])
            return options;
        }
      },
      propertyFilter(data){
        if(data){
            const options = data.reduce((option, item) => {
                option.push({label: item.vehicle.vehicle_name + ' - ' + item.plate_no, value: item.id})
                return option
            }, [])
            return options;
        }
      },
    },
    watch: {
      customer_id(newVal){
        // this.form.vehicle_id = '';
        this.$store.dispatch('property/emptyProperty');
        this.$store.dispatch('property/findProperty', newVal);
      },
      total_net(newVal){
        this.payment_form.net = newVal;
      }
    },
    computed:{
      sub_total_labor(){
        let service_labor = 0;
        let sub_service_parts = 0
        this.form.services.forEach(item => {
          service_labor += parseInt(item.labor_fee)
          item.sub_services.forEach(item_sub => {
            sub_service_parts += parseInt(item_sub.labor_fee);
          })
        })
        return service_labor + sub_service_parts;
      },
      totalExpenses(){
        console.log(this.other_expenses);
        let sum = 0;
        this.other_expenses.forEach(item => {
          sum += parseInt(item.amount);
        })
        return sum;
      },
      totalPurchased(){
        let sum = 0;
        this.purchase_items.forEach(item => {
          item.purchase_items.forEach(item2 => {
            let multi = item2.qty * item2.price;
            sum += multi;
          })
        })
        return sum;
      },
      total_net(){
        return this.payment_form.total_repair_cost - this.payment_form.policy_deductible - this.payment_form.betterment - this.payment_form.discount;
      },
      insurance(){
        return this.form.insurance;
      },
      customer_id(){
        return this.form.customer_id;
      },
      sub_total_parts(){
        let service_parts = 0;
        let sub_service_parts = 0
        this.form.services.forEach(item => {
          service_parts += parseInt(item.parts_fee)
          item.sub_services.forEach(item_sub => {
            sub_service_parts += parseInt(item_sub.parts_fee);
          })
        })
        
        return service_parts + sub_service_parts;
      },
      total_vat(){
        return this.sub_total_labor * 0.12;
      },
      total_labor_parts(){
        return this.sub_total_labor + this.sub_total_parts + this.total_vat;
      }
    },
    methods: {
      addCarProperty(data){
        let name = '';
        this.$store.state.property.property.forEach(item => {
          if(data == item.customer_id){
            name = item.customer.company_name;
          }
        });
        const params = {
          label: name,
          value: data
        }
        this.AddCarPropertyData = {
          trigger: new Date(),
          data: params
        }
      },
      addUnit(data){
        this.AddUnitData = data;
      },
      purchaseUpdated(data){
        console.log(data);
        console.log(this.purchase_items);
        const index = this.purchase_items.findIndex(item => item.id === data.id);
        console.log(index);
        if(index !== -1){
          this.purchase_items.splice(index, 1, data);
        }
      },
      addExpenses(){
        this.AddExpensesTypeData = new Date();
      },
      deleteExpensesType(data){
        this.showModalDataDelete = data;
      },
      AddOtherExpenses(){
        this.other_expenses.push({
          expenses_type_id: '',
          amount: 0
        })
      },
      deleteExpenses(data){
        this.other_expenses.splice(this.other_expenses.indexOf(data), 1);
      },
      editItem(id){
        console.log(id);
      },
      deleteItem(data){
        if (confirm('Are you sure you want to delete ' + data.item.product_name + ' ' + data.item.brand + '?')) {
          this.$store.dispatch('purchase/deleteItem', data.item_id).then(response => {
            if(response == 200){
              let items = this.purchase_items.filter(item => item.item_id != data.item_id);
              this.purchase_items = items;
            }
          });
        }
      },
      deleteModal(data){
          this.showModalDataDelete = data;
      },
      deleteModalShow(data){
        this.showModalDataDelete = data;
      },
      editPurchase(data){
        this.EditPurchaseData = {
          trigger: new Date(),
          data:data
        }
      },
      submit(){

        const params = {
          id: this.form.id,
          date: this.$root.momentFormatDateTimeConvert(this.form.date),
          agent_id: this.form.agent_id,
          insurance_id: this.form.insurance,
          vehicle_id: this.form.vehicle_id,
          services: this.form.services,
          customer_id: this.form.customer_id,
          total_repair_cost: this.payment_form.total_repair_cost,
          policy_deductible: this.payment_form.policy_deductible,
          betterment: this.payment_form.betterment,
          discount: this.payment_form.discount,
          net: this.payment_form.net,
          other_expenses: this.other_expenses
        }
        
        this.$store.dispatch('job_orders/updateJobOrder', params).then(() => {
            this.$router.replace({
              name: "Job Order"
            });
        });
      },
     
      child_action(data, event){
        if(event == 'add'){
            this.form.services.push({
              id: '',
              labor_fee: 0,
              parts_fee: 0,
              sub_services: []
            })
        }else{
          if(this.form.services.length != 1){
            this.form.services.splice(this.form.services.indexOf(data), 1);
          }
        }
      },
      passFiles(docName, prefix, files, id, data){
          
        //   this.form.documents.forEach(item => {
        //       console.log(item);
        //   })
        const index = this.form.documents.findIndex(item => item.document_type === docName);
        if(index !== -1){
          this.form.documents.splice(index, 1, {
            data: data,
            id: id,
            document_name: docName,
            document_type: docName,
            files: files,
            prefix: prefix,
            label: docName
          });
        }
      },
      childSubChanges(data){
        if(data){
          this.form.services.forEach(serv => {
            if(serv.id.value == data.services_id){
              serv.sub_services.every(sub => {
                sub.sub_services.push(data);
                return false;
              })
            }
          })
        }
      },
      childAddSubServices(data){
        this.AddSubServicesData = {
          trigger: new Date(),
          data: data
        }
      },
      addSubServices(data){
        this.trigger_add_sub = {
          trigger: new Date(),
          data: data
        };
      },
      openAddServices(){
        this.AddServicesData = new Date();
      },
      addItem(data){
          this.AddItemData = {
              trigger: new Date()
          }
      },
      addSupplier(){
        this.AddSupplierData = new Date();
      },
      purchaseAdded(data){
        this.purchase_items = data.purchases;
        // let purchase = [];
        // data.purchases.forEach(item => {
        //   if(item.purchase_items){
        //     item.purchase_items.forEach(item2 => {
        //       purchase.push({
        //         item_id: item2.id,
        //         purchase_id: item2.purchase_id,
        //         item: item2.item,
        //         qty: item2.qty,
        //         price: item2.price,
        //         date: item.date,
        //         supplier: item.supplier
        //       })
        //     })
        //   }
        // })
        // if(purchase){
        //   this.purchase_items = purchase;
        // }
      },
      convertByProperty(originalObject, groupByProperty, secondProperty) {  
        var finalArray = [];  
        var uniqueVals = [];  
        originalObject.map((i) => {  
            var existingVals = uniqueVals.filter((j) => {  
                return (i[groupByProperty] == j)  
            });  
            if (existingVals.length == 0) {  
                uniqueVals.push(i[groupByProperty]);  
            }  
        });  
        uniqueVals.map((k) => {  
            var dataObj = [];  
            var expectedObj = {};  
            var items = originalObject.filter((l) => {  
                return (l[groupByProperty] == k)  
            });  
            items.map((m) => {  
                var obj = {};  
                obj[secondProperty] = m[secondProperty];  
                obj['file_name'] = m.file_name;
                obj['document_type'] = m.document_type;
                obj['id'] = m.id;
                dataObj.push(obj);
            });
            const split = dataObj[0].file_name.split('-');
            expectedObj[groupByProperty] = k;  
            expectedObj['data'] = dataObj;
            expectedObj['prefix'] = split[0];
            expectedObj['id'] = dataObj[0].id;
            console.log(k);
            if(k == 'Pictures'){
                expectedObj['files'] = [];
            }else{
                expectedObj['files'] = '';
            }
            expectedObj['document_name'] = dataObj[0].document_type;
            expectedObj['label'] = dataObj[0].document_type;
            finalArray.push(expectedObj);  
        });  
        return finalArray;
      },
        withPopper(dropdownList, component, { width }) {
        /**
         * We need to explicitly define the dropdown width since
         * it is usually inherited from the parent with CSS.
         */
        dropdownList.style.width = width

        /**
         * Here we position the dropdownList relative to the $refs.toggle Element.
         *
         * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
         * the dropdownList overlap by 1 pixel.
         *
         * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
         * wrapper so that we can set some styles for when the dropdown is placed
         * above.
         */
        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: this.placement,
            modifiers: [
            {
                name: 'offset',
                options: {
                offset: [0, -1],
                },
            },
            {
                name: 'toggleClass',
                enabled: true,
                phase: 'write',
                fn({ state }) {
                component.$el.classList.toggle(
                    'drop-up',
                    state.placement === 'top'
                )
                },
            },
            ],
        })

        return () => popper.destroy()
        }
    },
    created(){
      this.$store.dispatch('customer/fetchCustomer');
      this.$store.dispatch('services/fetchServices');
      this.$store.dispatch('insurance/fetchInsurance');
      
      this.$store.dispatch('job_orders/findJobOrder', this.$route.params.id).then(response => {
          console.log(response);
          this.form = {
                id: response.id,
                job_order_no: response.job_order_no,
                customer_id: response.customer_id,
                date: this.$root.momentFormatDateTimeInput(response.date),
                insurance: response.insurance_id,
                vehicle_id: response.vehicle_id,
                vehicle: response.vehicle_id,
                services: response.scope,
                estimate_no: response.estimate_no,
                agent_id: response.agent_id
          }

          this.payment_form = {
                total_repair_cost: response.payables.total_repair_cost,
                policy_deductible: response.payables.policy_deductible,
                betterment: response.payables.betterment,
                discount: response.payables.discount,
                net: response.payables.net
          }

          this.other_expenses = response.other_expenses;

          // let purchase = [];
          // response.purchases.forEach(item => {
          //   if(item.purchase_items){
          //     item.purchase_items.forEach(item2 => {
          //       purchase.push({
          //         item_id: item2.id,
          //         purchase_id: item2.purchase_id,
          //         item: item2.item,
          //         qty: item2.qty,
          //         price: item2.price,
          //         date: item.date,
          //         supplier: item.supplier
          //       })
          //     })
          //   }
          // })

          this.purchase_items = response.purchases;
            
          setTimeout(() => this.media = false, 1000);
          
      });
    },
}
</script>
<style>
.inline {
    display:flex;
}
.align-self-start{
    display:none;
}
</style>
