<template>
  <div class="col">
    <FormStep1 v-if="step == 1" />
    <FormStep2 v-if="step == 2" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormStep1 from "./FormStep1.vue";
import FormStep2 from "./FormStep2.vue";

export default {
  components: { FormStep1, FormStep2 },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
    }),
  },
};
</script>

<style lang="scss">
</style>
