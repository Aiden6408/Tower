<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link
      class="navbar-brand d-flex justify-content-center"
      :to="{ name: 'Home' }"
    >
      <div class="text-success hoverable selectable mx-5">
        <b><h1>Home</h1></b>
      </div>
    </router-link>
    <div class="text-success hoverable selectable mx-5">
      <b><h4>Digital</h4></b>
    </div>
    <div class="text-success hoverable selectable mx-5">
      <b><h4>Sports</h4></b>
    </div>
    <div class="text-success hoverable selectable mx-5">
      <b><h4>Concerts</h4></b>
    </div>
    <div class="text-success hoverable selectable mx-5">
      <b><h4>Conventions</h4></b>
    </div>
    <button
      data-bs-toggle="modal"
      data-bs-target="#event"
      class="btn btn-success mx-5 selectable"
    >
      Add Your Own Event!
    </button>
    <div></div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li></li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="me-5">
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {

    return {
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
