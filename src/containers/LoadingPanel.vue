<template>
    <div>
        <loading 
        v-for="load in loading"
        :key="load.id"
        :loading="loading"
        />
    </div>
</template>
<script>
import Loading from './Loading';
import { mapGetters } from 'vuex';

export default {
    components: { 
        Loading
    },
    computed: {
    ...mapGetters({
        loading: "loading/loading",
      })
    },
}
</script>