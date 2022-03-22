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
              data-bs-target="#event"
              class="btn btn-success mx-5 selectable"
            >
              Edit
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
  <div class="row justify-content-center">
    <div class="col-10 bg-dark text-center comments mt-5">
      <div v-for="c in comments" :key="c.id" class="col-md-10">
        <Comment :comment="c" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from '../AppState'
import { useRoute } from 'vue-router';
import { onMounted } from '@vue/runtime-core';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';


export default {


  setup() {

    const route = useRoute();
    onMounted(async () => {
      try {

        AppState.activeEvent = {};
        await eventsService.getById(route.params.id);

      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      async edit() {
        try {
          await eventsService.edit(editable.value)
          Modal.getOrCreateInstance(
            document.getElementById("event")
          ).hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },
      towerEvents: computed(() => AppState.towerEvents),
      towerEvent: computed(() => AppState.activeEvent),
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