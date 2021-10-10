<template>
  <main id="app">
    <nav
      v-if="step > 1 && step < 4"
      class="container d-flex flex-1 align-items-center"
    >
      <unicon
        name="angle-left-b"
        fill="black"
        class="flex-grow-1"
        @click="handleClickButton"
      ></unicon>
    </nav>
    <router-view />
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      step: "getActiveStep",
    }),
  },
  methods: {
    handleClickButton() {
      this.$store.commit("decrementStep");
    },
  },
};
</script>

<style lang="scss">
#app {
  background: $cta-1;
  height: 100%;
  width: 100%;
  min-height: 100vh;

  nav {
    height: toRem(68px);

    .unicon {
      cursor: pointer;
    }
  }
}
</style>
