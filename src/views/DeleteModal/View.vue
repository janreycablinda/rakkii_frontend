<template>
<div>
    <CModal
      color="primary"
      centered
      :closeOnBackdrop="false"
      size="sm"
      :show.sync="smModal"
    >
        <template #header>
            <h6 class="modal-title">DELETE {{title}}</h6>
            <CButtonClose @click="smModal = false" class="text-white"/>
        </template>
        <!-- <CustomerTable
        :items="$store.state.customer.customer"
        /> -->
        <VehicleTable
        :items="$store.state.vehicle.vehicle"
        v-if="vehicle_table"
        />
        <PersonnelTypeTable
            :items="$store.state.personnel_type.personnel_type"
            v-if="personnel_type_table"
        />
        <ServicesTypeTable
            :items="$store.state.services_type.services_type"
            v-if="services_type_table"
        />
        <ExpensesTypeTable
            v-if="expenses_type_table"
            :items="$store.state.expenses_type.expenses_type"
        />
        <UnitTable
            v-if="unit_table"
            :items="$store.state.unit.unit"
        />
        <template #footer>
            &nbsp;
        </template>
    </CModal>
    <CModal
      color="primary"
      centered
      :closeOnBackdrop="false"
      :show.sync="mdModal"
    >
        <template #header>
            <h6 class="modal-title">DELETE {{title}}</h6>
            <CButtonClose @click="mdModal = false" class="text-white"/>
        </template>
        <PropertyTable
            :items="$store.state.property.property"
            v-if="property_table"
        />
        <ServicesTable
            :items="$store.state.services.services"
            v-if="services_table"
        />
        <SubServicesTable
            :items="$store.state.sub_services.find_sub_services"
            v-if="sub_services_table"
            v-on:update_sub_services="updateSubServices"
        />
        <AgentTable
            :items="$store.state.agent.agent"
            v-if="agent_table"
        />
        <ItemTable
            :items="$store.state.item.item"
            v-if="item_table"
        />
        <PersonnelTable
            :items="$store.state.personnel.personnel"
            v-if="personnel_table"
        />
        <template #footer>
            &nbsp;
        </template>
    </CModal>
    <CModal
      color="primary"
      :show.sync="xlModal"
      centered
      :closeOnBackdrop="false"
      size="xl"
    >
        <template #header>
            <h6 class="modal-title">DELETE {{title}}</h6>
            <CButtonClose @click="xlModal = false" class="text-white"/>
        </template>
        <CustomerTable
        :items="$store.state.customer.customer"
        v-if="customer_table"
        />
        <InsuranceTable
        :items="$store.state.insurance.insurance"
        v-if="insurance_table"
        />
        <SupplierTable
            :items="$store.state.supplier.supplier"
            v-if="supplier_table"
        />
        <template #footer>
            &nbsp;
        </template>
    </CModal>
</div>
</template>
<script>

import CustomerTable from './CustomerTable';
import PropertyTable from './PropertyTable';
import VehicleTable from './VehicleTable';
import InsuranceTable from './InsuranceTable';
import ServicesTable from './ServicesTable';
import ServicesTypeTable from './ServicesTypeTable';
import SubServicesTable from './SubServicesTable';
import AgentTable from './AgentTable';
import SupplierTable from './SupplierTable';
import ItemTable from './ItemTable';
import PersonnelTable from './PersonnelTable';
import PersonnelTypeTable from './PersonnelTypeTable';
import ExpensesTypeTable from './ExpensesTypeTable';
import UnitTable from './UnitTable';

export default {
    data(){
        return {
            showModalDelete: false,
            size: 'md',
            title: '',
            smModal: false,
            mdModal: false,
            xlModal: false,
            customer_table: false,
            property_table: false,
            vehicle_table: false,
            insurance_table: false,
            services_table: false,
            sub_services_table: false,
            agent_table: false,
            supplier_table: false,
            item_table: false,
            personnel_table: false,
            personnel_type_table: false,
            services_type_table: false,
            expenses_type_table: false,
            unit_table: false,
            sub_services: []
        }
    },
    components: {
        CustomerTable,
        PropertyTable,
        VehicleTable,
        InsuranceTable,
        ServicesTable,
        SubServicesTable,
        AgentTable,
        SupplierTable,
        ItemTable,
        PersonnelTable,
        PersonnelTypeTable,
        ServicesTypeTable,
        ExpensesTypeTable,
        UnitTable
    },
    props: ['showModalDataDelete'],
    watch: {
        showModalDataDelete(data){
            this.customer_table = false;
            this.property_table = false;
            this.vehicle_table = false;
            this.insurance_table = false;
            this.services_table = false;
            this.agent_table = false;
            this.supplier_table = false;
            this.item_table = false;
            this.personnel_table = false;
            this.personnel_type_table = false;
            this.services_type_table = false;
            this.expenses_type_table = false;
            this.unit_table = false;
            if(data.modal_size == 'sm'){
                this.smModal = true;
            }else if(data.modal_size == 'md'){
                this.mdModal = true;
            }else{
                this.xlModal = true;
            }
            this.title = data.delete_type;
            if(data.delete_type == 'CUSTOMER'){
                this.customer_table = true;
                this.$store.dispatch('customer/fetchCustomer');
            }else if(data.delete_type == 'PROPERTY'){
                this.property_table = true;
                this.$store.dispatch('property/emptyProperty');
                this.$store.dispatch('property/findProperty', data.customer_id.value);
            }else if(data.delete_type == 'VEHICLE'){
                this.vehicle_table = true;
                this.$store.dispatch('vehicle/fetchVehicle');
            }else if(data.delete_type == 'INSURANCE'){
                this.insurance_table = true;
                this.$store.dispatch('insurance/fetchInsurance');
            }else if(data.delete_type == 'SERVICES'){
                this.services_table = true;
                this.$store.dispatch('services/fetchServices');
            }else if(data.delete_type == 'SERVICES TYPE'){
                this.services_type_table = true;
                this.$store.dispatch('services_type/fetchServicesType');
            }else if(data.delete_type == 'SUBSERVICES'){
                this.sub_services_table = true;
                this.$store.dispatch('sub_services/findSubServices', data.services_id).then(response => {
                    this.sub_services = response;
                    console.log(this.sub_services);
                });
            }else if(data.delete_type == 'AGENT'){
                this.agent_table = true;
                this.$store.dispatch('agent/fetchAgent');
            }else if(data.delete_type == 'SUPPLIER'){
                this.supplier_table = true;
                this.$store.dispatch('sub_services/fetchSupplier');
            }else if(data.delete_type == 'ITEM'){
                this.item_table = true;
                this.$store.dispatch('item/fetchItem');
            }else if(data.delete_type == 'PERSONNEL'){
                this.personnel_table = true;
                this.$store.dispatch('personnel/fetchPersonnel');
            }else if(data.delete_type == 'PERSONNEL TYPE'){
                this.personnel_type_table = true;
                this.$store.dispatch('personnel_type/fetchPersonnelType');
            }else if(data.delete_type == 'EXPENSES TYPE'){
                this.expenses_type_table = true;
                this.$store.dispatch('expenses_type/fetchExpensesType');
            }else if(data.delete_type == 'UNIT'){
                this.unit_table = true;
                this.$store.dispatch('unit/fetchUnit');
            }

        }
    },
    methods: {
        updateSubServices(data){
            this.$emit('update_sub_services', data);
        }
    }
}
</script>