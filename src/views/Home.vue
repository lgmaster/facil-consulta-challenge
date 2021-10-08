<template>
  <div class="home container"></div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
.home {
  background: $secondary-0;
  max-height: toRem(600px);
  font-size: toRem(16px);
  border-radius: toRem(30px);
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: block;
  box-shadow: 0px 9px 7px $danger;
}
</style>
