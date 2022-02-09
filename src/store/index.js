import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import notification from "./modules/notification";
import unit from "./modules/unit";
import group from "./modules/group";
import item from "./modules/item";
import import_item from "./modules/import";
import stockin from "./modules/stockin";
import stockout from "./modules/stockout";
import customer from "./modules/customer";
import inventory from "./modules/inventory";
import loading from "./modules/loading";
import country from './modules/country';
import services_type from './modules/services_type';
import services from './modules/services';
import sub_services from './modules/sub_services';
import estimate from './modules/estimate';
import property from './modules/property';
import vehicle from './modules/vehicle';
import insurance from './modules/insurance';
import document from './modules/documents';
import supplier from './modules/supplier';
import users from './modules/users';
import job_orders from './modules/job_orders';
import personnel from './modules/personnel';
import personnel_type from './modules/personnel_type';
import uploader from './modules/uploader';
import roles from './modules/roles';
import purchase from './modules/purchase';
import agent from './modules/agent';
import gatepass from './modules/gatepass';
import payments from './modules/payment';
import chart from './modules/chart';

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: true,
  darkMode: false,
  asideShow: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {
    auth,
    notification,
    unit,
    group,
    item,
    import_item,
    stockin,
    customer,
    stockout,
    inventory,
    loading,
    country,
    services_type,
    services,
    sub_services,
    estimate,
    property,
    vehicle,
    insurance,
    document,
    supplier,
    users,
    job_orders,
    personnel,
    personnel_type,
    uploader,
    roles,
    purchase,
    agent,
    gatepass,
    payments,
    chart
  }
});
