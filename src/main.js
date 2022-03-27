import 'core-js/stable'
import Vue from 'vue'
//import CoreuiVue from '@coreui/vue/src'
import CoreuiVuePro from '@coreui/vue-pro/src/index.js'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VCalendar from 'v-calendar'
import SimpleTimeline from 'vue-simple-timeline';
import VueHtmlToPaper from 'vue-html-to-paper';

axios.defaults.baseURL = process.env.VUE_APP_BACKEND + "/api/";

import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css'
  ],
  timeout: 2000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
});

Vue.use(VueHtmlToPaper, options);

Vue.use(VCalendar)
Vue.use(Vuelidate)
Vue.use(SimpleTimeline);

import excel from 'vue-excel-export'
 
Vue.use(excel)

const moment = require('moment')
 
Vue.use(require('vue-moment'), {
    moment
});

import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.filter('numFormat', numFormat(numeral));

require("@/store/subscriber");

Vue.use(CoreuiVuePro)
Vue.prototype.$log = console.log.bind(console)


store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  
  Vue.use(abilitiesPlugin, ability);
  new Vue({
    el: '#app',
    router,
    store,
    data: {
      btn_load(status, elem, text) {
        var button = document.getElementById(elem);
        if (status) {
          button.innerHTML = text + ' <div role="status" aria-hidden="false" aria-label="Loading" class="spinner-border spinner-border-sm text-white"></div>';
          button.disabled = true; 
        } else {
          button.innerHTML = text;
          button.disabled = false; 
        }
      },
      momentParse(data) {
          return moment(data).fromNow();
      },
      momentFormat(data){
        return moment(data, "YYYY-MM-DD h:mm:ss").format('YYYY/MM/DD');
      },
      momentFormatDateTime(data){
        return moment(data, "YYYY-MM-DD h:mm:ss").format('YYYY/MM/DD hh:mm A');
      },
      momentFormatDateTimeInput(data){
        return moment(data, "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DDTHH:mm');
      },
      momentFormatDateTimeConvert(data){
        return moment(data, "YYYY-MM-DDThh:mm").format('YYYY-MM-DD HH:mm:ss');
      },
      momentFormatDateTimeGet(){
        return moment(new Date()).format('YYYY-MM-DDTHH:mm');
      }
    },
    icons,
    template: '<App/>',
    components: {
      App
    }
  })
});