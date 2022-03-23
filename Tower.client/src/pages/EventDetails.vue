<template>
  <div class="row mt-5 ms-5">
    <div
      class="size rounded border-5 shadow selectable border-2 mb-3 d-flex col-4"
      :style="{ backgroundImage: `url(${towerEvent.coverImg})` }"
    ></div>
    <div class="col-8">
      <div class="d-flex justify-content-between">
        <h2 class="ms-3">{{ towerEvent.name }}</h2>
        <div>
          <h4>{{ new Date(towerEvent.startDate).toLocaleString() }}</h4>
          <div class="ms-5">
            <button
              @click="edit"
              data-bs-toggle="modal"
              data-bs-target="#edit"
              class="btn btn-success mx-5 selectable"
            >
              Edit
            </button>
            <button
              @click="MakeReservation(eventId)"
              class="btn btn-success mx-5 selectable"
            >
              Reserve?
            </button>
            <i class="mdi mdi-close-thick mdi-24px selectable mx-3"></i>
          </div>
        </div>
      </div>

      <h4 class="ms-3">{{ towerEvent.location }}</h4>
      <div
        :class="{
          'text-danger': towerEvent.iscanceled || towerEvent.capacity == 0,
        }"
        class="d-flex ms-3"
      >
        <h3 class="">
          Spots Left:
          {{ towerEvent.capacity }}
        </h3>
      </div>
      <div class="margint ms-3">
        <h4>{{ towerEvent.description }}</h4>
      </div>
    </div>
  </div>
  <div>
    <div class="py-2 hoverable" v-for="r in reservations" :key="r.id">
      <img :src="r.picture" :title="r.name" />
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-10 bg-light text-center comments mt-5">
      <form @submit.prevent="createComment">
        >
        <input
          v-model="editable.body"
          type="text"
          class="description-2"
          name="startdate"
          id="description"
          placeholder="How was it....?"
          minlength="3"
          maxlength="20"
        />
      </form>
      <div class="col-md-10">
        <Comments v-for="c in comments" :key="c.id" :comment="c" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from '../AppState'
import { useRoute } from 'vue-router';
import { onMounted, watchEffect } from '@vue/runtime-core';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { commentsService } from '../services/CommentsService';
import { reservationService } from '../services/ReservationService'

export default {
  name: "EventDetails",


  setup(props) {

    const route = useRoute();
    const editable = ref({ eventId: route.params.id })



    onMounted(async () => {
      try {
        await commentsService.getTowerEventComments(route.params.id);
        await eventsService.getById(route.params.id);
        await reservationService.getEventsReservation(route.params.id)

      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {

      editable,
      route,
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.towerEvents),
      towerEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      reservations: computed(() => AppState.reservations),
      reservation: computed(() => AppState.reservations.find((r) => r.accountId == AppState.account.id)),





      async delete() {
        try {
          if (await Pop.confirm()) {
            await eventsSService.delete(route.params.id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },
      async getTowerEventComments() {
        try {

          await commentsService.getTowerEventComments(route.params.id)
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error.message)
        }
      },
      async MakeReservation() {
        try {
          await reservationService.MakeReservation(route.params.id)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },
      async createComment() {
        try {

          await commentsService.createComment(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log()
        }
      },

      async remove() {
        try {

          await commentsService.remove(editable.value)
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log()
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.size {
  height: 30rem;
  width: 30rem;
}
.comments {
  height: 100vh;
  width: 70vw;
}
.margint {
  margin-top: 7rem;
}
</style>