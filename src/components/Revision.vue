<template>
  <FormulateForm
    :values="formValues"
    @submit="handleClickForm"
    class="col form revision d-flex flex-column"
  >
    <div class="revision__description">
      <p>Nome completo</p>
      <span>{{ formValues.name }}</span>
      <p>CPF</p>
      <span>{{ formValues.cpf }}</span>
      <p>Número de celular ou telefone</p>
      <span>{{ formValues.telephone }}</span>
      <p>Estado/Cidade</p>
      <span>{{ formValues.state }} - {{ formValues.city }}</span>
      <p>Especialidade principal</p>
      <span>{{ formValues.specialty }}</span>
      <p>Preço da consulta</p>
      <span>{{ formValues.consultationFee + ",00" }}</span>
      <p>Formas de pagamento da consulta</p>
      <template
        v-if="formValues.paymentmethods.some((method) => method === 'card')"
      >
        <span
          >Cartão de crédito - Parcelamento em {{ formValues.installments }}x
          sem juros</span
        >
      </template>
      <template
        v-if="formValues.paymentmethods.some((method) => method === 'money')"
      >
        <span>Dinheiro</span>
      </template>
      <template
        v-if="formValues.paymentmethods.some((method) => method === 'pix')"
      >
        <span>PIX</span>
      </template>
    </div>
    <Button color="cta-0" buttontext="Cadastrar profissional" class="mt-5" />
    <button class="revision__edit align-self-center mt-3" @click="resetStep">
      Editar cadastro
    </button>
  </FormulateForm>
</template>

<script>
import { mapGetters } from "vuex";

import Button from "./Button.vue";

export default {
  components: { Button },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
      formValues: "getFormData",
    }),
  },
  methods: {
    handleClickForm() {
      this.$store.commit("incrementStep");
    },
    resetStep() {
      this.$store.commit("resetStep");
    },
  },
};
</script>

<style lang="scss">
.revision {
  &__description {
    p {
      color: $secondary-4;
      font-weight: bold;
      font-size: toRem(14px);
      margin-bottom: toRem(5px);
    }

    span {
      margin-bottom: toRem(10px);
      font-size: toRem(12px);
      display: block;
    }
  }
  &__edit {
    margin: 0 auto;
    background: transparent;
    border: none;
    font-family: $Comfortaa;
    color: $primary-0;
    font-weight: 700;
  }
}
</style>
