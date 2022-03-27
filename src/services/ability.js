import { defineAbility } from '@casl/ability';

export default defineAbility((can) => {
    if(JSON.parse(localStorage.getItem("permissions"))){
        JSON.parse(localStorage.getItem("permissions")).forEach(item => {
            can(item.action, item.page);
        })
    }
});