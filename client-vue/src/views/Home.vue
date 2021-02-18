<template>
  <div class="home">
    <header-nav></header-nav>
  </div>
</template>

<script>
// @ is an alias to /src
import headerNav from '@/components/HeaderNav.vue'

export default {
  name: 'home',
  components: {
    headerNav
  }
}
</script>
