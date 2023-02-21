<template>
  <div id="app">
    <AppHeader></AppHeader>
    <MessagesForm></MessagesForm>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import MessagesForm from '@/components/MessagesForm.vue';
export default {
  name: 'App',
  components: {
    AppHeader,
    MessagesForm,
  }
}
</script>

<style>
#app {
  height: 100vh;
  display:flex;
}
</style>
