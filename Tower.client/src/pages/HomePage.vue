



<template>
  <div class="container">
    <div class="row">
      <div v-for="e in events" :key="e.id" class="col-3 m-5">
        <EventCard :tower-event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsService'
import EventForm from '../components/EventForm.vue';




export default {

  name: 'Home',
  setup() {
    onMounted(async () => {

      try {
        await eventsService.getAll();
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.error(error)
      }
    })
    return {
      events: computed(() => AppState.events),
    }
  },
};
</script>




<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
