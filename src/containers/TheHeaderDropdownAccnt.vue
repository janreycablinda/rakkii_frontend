<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          {{name}}
          <!-- <img
            src="/img/upload/blank.png"
            class="c-avatar-img "
          /> -->
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem to="/profile">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <!-- <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem> -->
    <CDropdownDivider/>
    <CDropdownItem @click="signOut">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42,
      initial_name: ''
    }
  },
  computed: {
    ...mapGetters({
        authenticated: "auth/authenticated",
        user: "auth/user"
    }),
    name(){
      let name = this.$store.getters['auth/user'].name;
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

      let initials = [...name.matchAll(rgx)] || [];

      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase();

      return initials;
    }
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "Login"
        });
      });
    }
  },
  created(){
    
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  .c-avatar{
    background: #355288;
    color: #fff;
    font-weight: 500;
  }
</style>