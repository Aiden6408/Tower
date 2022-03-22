<template>
  <div
    class="
      size
      clear
      rounded
      border-dark border-5
      shadow
      selectable
      border-2
      mb-3
    "
    :style="{ backgroundImage: `url(${towerEvent.coverImg})` }"
  >
    <div>
      <div class="overlay rounded text-dark"></div>
      <div class="container text-center">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'EventDetails', params: { id: towerEvent.id } }"
        >
          <div>
            <h5 class="hoverable selectable">{{ towerEvent.name }}</h5>
          </div>
        </router-link>
        <div>
          <h6>{{ towerEvent.location }}</h6>
        </div>
        <div>{{ dateFormat.format(new Date(towerEvent.startDate)) }}</div>
        <div>
          <div>
            <h6 class="d-flex justify-content-between mt-5">
              <div
                :class="{
                  'text-danger':
                    towerEvent.iscanceled || towerEvent.capacity == 0,
                }"
                class="d-flex"
              >
                <p class="mx-2">Spots Left:</p>
                {{ towerEvent.capacity }}
              </div>
              <div class="d-flex justify-content-end">
                <i class="mdi mdi-pencil mdi-18px selectable mx-3"></i>
                <i class="mdi mdi-close-thick mdi-18px selectable"></i>
              </div>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from '../AppState'

export default {
  name: 'EventDetails',
  props: {
    towerEvent: {
      type: Object,
      required: true,
    }
  },
  setup() {
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    return {
      dateFormat,
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>


<style lang="scss" scoped>
.size {
  height: 20rem;
  width: 20rem;
}
.container {
  position: absolute;
  font-display: bold;
  font-weight: 600;
}
.overlay {
  backdrop-filter: blur(20px);
  opacity: 80%;
  background-color: rgb(225, 229, 238);
  height: 10rem;
  width: 20rem;
  transform: translateY(160px);
  position: relative;
}
</style>