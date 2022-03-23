<template>
  <div class="about text-center">
    <h1>Welcome to your Account Page {{ account.name }}!</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="col-10">
    <EventCard v-for="m in myEvents" :key="m.id" :towerEvent="m" />
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { reservationService } from "../services/ReservationService"
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService';

export default {
  props: {
    myEvent: {
      type: Object,

    }
  },
  name: 'Account',
  setup(props) {
    const route = useRoute()

    onMounted(async () => { eventsService.getAll(), reservationService.myReservations() })

    return {

      myEvents: computed(() => AppState.myEvents),

      account: computed(() => AppState.account),
      myEvent: computed(() => AppState.myEvents)
    }
  }
}
  </script>