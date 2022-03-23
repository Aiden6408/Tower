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
    :style="{ backgroundImage: `url(${myEvent.coverImg})` }"
  >
    <div>
      <div class="overlay rounded text-dark"></div>
      <div class="container text-center">
        <router-link
          style="text-decoration: none; color: inherit"
          :to="{ name: 'EventDetails', params: { id: myEvent.id } }"
        >
          <div>
            <h5 class="hoverable selectable">{{ myEvent.name }}</h5>
          </div>
        </router-link>
        <div>
          <h6>{{ myEvent.location }}</h6>
        </div>
        <div>{{ dateFormat.format(new Date(myEvent.startDate)) }}</div>
        <div>
          <div>
            <h6 class="d-flex justify-content-between mt-5">
              <div
                :class="{
                  'text-danger': myEvent.iscanceled || myEvent.capacity == 0,
                }"
                class="d-flex"
              >
                <p class="mx-2">Spots Left:</p>
                {{ myEvent.capacity }}
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
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { eventsService } from "../services/EventsService"
export default {
  props: {
    myEvent: {
      type: Object
    }
  },
  name: 'Account',
  setup(props) {
    onMounted(() => eventsService.getMyreservations())
    return {
      account: computed(() => AppState.account),
      myEvent: computed(() => AppState.myEvents)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>