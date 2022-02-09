import { defineAbility } from '@casl/ability';
import store from '../store/index'

export default defineAbility((can) => {

        if(JSON.parse(localStorage.getItem("permissions"))){
            JSON.parse(localStorage.getItem("permissions")).forEach(item => {
                can(item.action, item.page);
            })
        }
});