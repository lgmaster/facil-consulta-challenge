<template>
  <FormulateInput
    class="form__button"
    type="submit"
    :label="buttontext"
    :class="color"
  />
</template>

<script>
export default {
  name: "Button",
  props: ["buttontext", "color"],
};
</script>

<style lang="scss">
.form__button.primary-0 button {
  background: $primary-0;
}

.form__button.cta-0 button {
  background: $cta-0;
  color: $primary-0;
}

.form__button button {
  width: 100%;
  height: toRem(40px);
  color: $secondary-0;
  text-transform: uppercase;
  border-radius: toRem(12px);
  border: none;

  span {
    font-family: $Comfortaa;
    font-weight: 700;
  }
}
</style>
