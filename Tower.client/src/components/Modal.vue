<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark">
            <slot name="title"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>