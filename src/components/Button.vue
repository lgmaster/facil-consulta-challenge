<template>
  <FormulateInput class="form__button" type="submit" :label="buttontext" />
</template>

<script>
export default {
  name: "Button",
  props: ["buttontext"],
};
</script>

<style lang="scss">
.form__button button {
  width: 100%;
  height: toRem(40px);
  background: $primary-0;
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
