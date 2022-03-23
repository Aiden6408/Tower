<template>
  <form class="mb-3">
    <label for="name"> Name:</label>
    <input
      v-model="editable.name"
      type="text"
      class="form-control my-2"
      name="name"
      id="name"
      placeholder="Name..."
      required
      minlength="3"
      maxlength="20"
    />
    <input
      v-model="editable.description"
      type="text"
      class="form-control my-2"
      name="description"
      id="description"
      placeholder="description..."
      required
      minlength="3"
      maxlength="20"
    />
    <input
      v-model="editable.coverImg"
      type="text"
      class="form-control my-2"
      name="Img"
      id="Img"
      placeholder="Img..."
      required
      minlength="3"
      maxlength="20"
    />
    <input
      v-model="editable.location"
      type="text"
      class="form-control my-2"
      name="location"
      id="location"
      placeholder="location..."
      required
      minlength="3"
      maxlength="20"
    />
    <input
      v-model="editable.capacity"
      type="text"
      class="form-control my-2"
      name="capacity"
      id="capacity"
      placeholder="capacity..."
      required
      minlength="3"
      maxlength="20"
    />
    <input
      v-model="editable.startDate"
      type="datetime-local"
      class="form-control my-2"
      name="startdate"
      id="datetime-local"
      placeholder="StartDate..."
      required
      minlength="3"
      maxlength="20"
    />

    <button
      v-if="newEventData"
      @click="create"
      type="button"
      class="btn btn-success text-dark text-uppercase selectable"
    >
      <b> Create Event </b>
    </button>

    <!-- <button
      v-if="towerEvent.creatorId == account.id"
      @click="edit"
      type="button"
      class="btn btn-info text-warning text-uppercase selectable"
    >
      <b> Edit Event </b> -->
    <!-- </button> -->
  </form>
</template>


<script>

import { computed, reactive, onMounted, ref, watchEffect } from "vue"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { useRouter } from "vue-router"
import { commentsService } from "../services/CommentsService"
import { AppState } from '../AppState'

export default {

  props: {
    newEventData: {
      type: Object,
      required: false,
      default: {},
    },
  },

  setup(props) {
    const router = useRouter(),
      editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.activeEvent }
    })
    onMounted(async () => {
      try {

      } catch (error) {
        Pop.toast(error.message, "error")
        logger.error(error)
      }
    })

    return {
      editable,
      towerEvent: computed(() => AppState.towerEvents),
      async create() {
        try {
          logger.log("editable before service", editable.value)
          let newData = await eventsService.create(editable.value)
          editable.value = {}
          router.push({ name: 'EventDetails', params: { id: newData.id } })
          Modal.getOrCreateInstance(
            document.getElementById("event")
          ).hide()


        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, "error")
        }
      },
      async edit() {
        try {
          await eventsService.edit(editable.value),
            Modal.getOrCreateInstance(document.getElementById('event')).hide()
        } catch (error) {
          Pop.toast(error.message, "error"); logger.error(error)
        }
      }
    }
  }
}



</script>


<style lang="scss" scoped>
</style>