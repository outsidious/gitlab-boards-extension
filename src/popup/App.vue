<template>
  <body>
    <div> Qoollab </div>
    <hello-world> </hello-world>
  </body>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: { HelloWorld }
}
</script>

<style>
html {
  width: 400px;
  height: 200px;
}
</style>
