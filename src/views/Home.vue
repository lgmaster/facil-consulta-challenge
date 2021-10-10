<template>
  <article
    class="home container d-flex flex-column justify-content-between flex-wrap"
  >
    <header class="row justify-self-start">
      <h1>{{ texts[step].title }}</h1>
      <h2>{{ texts[step].text }}</h2>
    </header>
    <div class="row home__content mt-3 d-flex flex-grow-1 align-items-center">
      <Form />
      <div class="col d-none d-md-none d-lg-flex flex-grow-1 align-items-start">
        <img
          :src="require('@/assets/images/desktop-pagina-' + step + '.png')"
          alt="imagem do formulário"
          class="img-fluid"
          v-if="step < 4"
        />
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  data() {
    return {
      texts: {
        1: {
          title: "Sobre o profissional",
          text: "Dados do profissional",
        },
        2: {
          title: "Sobre o atendimento",
          text: "Detalhes do atendimento",
        },
        3: {
          title: "Revisão do cadastro",
          text: null,
        },
        4: {
          title: "Confirmação do cadastro",
          text: null,
        },
      },
    };
  },
  components: {
    Form,
  },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
    }),
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
