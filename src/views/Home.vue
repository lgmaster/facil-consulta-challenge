<template>
  <article
    class="home container d-flex flex-column justify-content-between flex-wrap"
  >
    <header class="row justify-self-start">
      <h1>Sobre o profissional</h1>
      <h2>Dados do profissional</h2>
    </header>
    <div class="row home__content mt-3 d-flex flex-grow-1 align-items-center">
      <Form />
      <div class="col d-none d-md-none d-lg-flex flex-grow-1 align-items-start">
        <img
          src="@/assets/images/desktop-pagina-1.png"
          alt="imagem do formulário"
          class="img-fluid"
        />
      </div>
    </div>
  </article>
</template>

<script>
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    Form,
  },
};
</script>

<style lang="scss">
.home {
  background: $secondary-0;
  min-height: toRem(690px);
  height: max-content;
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

  padding-top: toRem(50px);
  padding-bottom: toRem(50px);

  header {
    padding-left: toRem(30px);
    padding-right: toRem(30px);
  }

  &__content {
    padding-left: toRem(30px);
    padding-right: toRem(30px);
  }

  h1 {
    color: $primary-0;
    font-family: $Comfortaa;
    font-weight: 700;
  }

  h2 {
    color: $secondary-7;
    font-size: toRem(22px);
    font-weight: 600;
  }
}
</style>
