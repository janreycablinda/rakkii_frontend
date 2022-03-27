<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand to="/">
      <img height="35" class="c-sidebar-brand-full" src="/img/upload/logo.png">
      <img height="35" class="c-sidebar-brand-minimized" src="/img/upload/logo-min.png">
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="sidebarModified"/>
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from './SidebarItems'
export default {
  name: 'TheSidebar',
  extends: SidebarItems,
  data(){
    return {
      sidebarModified: []
    }
  },
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  created(){
    this.sidebarModified = this.sidebarItems;
    
    console.log(this.$store.getters['auth/authenticated'])
    if(this.$store.getters['auth/authenticated']){
      let parent = [];
      this.sidebarItems[0]._children.forEach(item => {
        if(item.items){
          if(this.$ability.can('read', item.name)){
            let child = [];
            item.items.forEach(item2 => {
              if(this.$ability.can('read', item2.name)){
                child.push(item2);
              }
            })
            parent.push({
              gate: item.gate,
              icon: item.icon,
              items: child,
              name: item.name,
              route: item.route,
              _name: item._name,
            })
            console.log(child);
          }
        }else{
          if(this.$ability.can('read', item.name)){
            parent.push(item);
          }
        }
      })
      this.sidebarModified = [{
        _children: parent,
        _name: 'CSidebarNav'
      }]
    }
  }
}
</script>

