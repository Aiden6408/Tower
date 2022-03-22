<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
    <Modal id="event">
      <template #title>Create Event</template>
      <template #body><EventForm /></template>
    </Modal>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
