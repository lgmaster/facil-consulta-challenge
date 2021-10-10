<template>
  <div class="form__progress row ms-0 mt-3">
    <div class="progress col p-0">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: step * 50 + '%' }"
        :aria-valuenow="step * 50"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <span class="col-4 col-sm-3 col-md-3 text-end">{{ step }} de 2</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      step: "getActiveStep",
    }),
  },
};
</script>

<style lang="scss" scoped>
.form__progress {
  margin-bottom: toRem(20px);

  .progress {
    height: toRem(20px);

    .progress-bar {
      background: $primary-0;
    }
  }

  span {
    color: $primary-0;
    font-family: $Comfortaa;
    font-weight: 700;
  }
}
</style>
