<template>
  <i @click="remove" class="mdi mdi-close-thick selectable"></i>
  <div class="text-dark">
    {{ comment.body }}
    {{ comment.creator.name }}
    <img :src="comment.creator.picture" alt="" />
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'

import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
export default {

  props: {
    comment: { type: Object, required: true },
  },
  setup(props) {
    const route = useRoute()

    return {

      async remove() {
        try {

          if (await Pop.confirm()) {
            await commentsService.remove(props.comment.id)
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error.message)
        }
      },
      comments: computed(() => AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>