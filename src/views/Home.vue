<template>
  <div class="home">
    <siteMenu></siteMenu>
    
    <h1>صفحه اصلی سایت</h1>
   
  </div>
</template>

<script>
// @ is an alias to /src

import siteMenu from '@/components/menu.vue'

export default {
  name: 'home',
  components: {
    siteMenu
  }
}
</script>
