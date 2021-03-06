<template>
  <FormulateForm
    :values="formValues"
    name="step2"
    @submit="handleClickForm"
    class="col form"
  >
    <FormulateInput
      v-model="mainSpecialty"
      name="specialty"
      :options="mainSpecialties"
      type="select"
      placeholder="Selecione a especialidade"
      label="Especialidade principal*"
      validation="required"
      :validation-messages="{ required: 'Especialidade é obrigatório' }"
      class="col"
    />

    <FormulateInput
      v-model="consultationFee"
      type="text"
      name="consultationFee"
      label="Informe o preço
    da consulta*"
      placeholder="Valor"
      validation="required"
      :validation-messages="{
        required: 'Valor da consulta é obrigatório',
      }"
      autocomplete="none"
    />

    <FormulateInput
      v-model="paymentMethod"
      :options="{
        money: 'Em dinheiro',
        pix: 'Pix',
        card: 'Cartão de crédito',
      }"
      name="paymentmethods"
      type="checkbox"
      label="Formas de pagamento da consulta*"
      validation="required"
      :validation-messages="{
        required: 'Selecione uma forma de pagamento',
      }"
    />

    <FormulateInput
      v-model="cardInstallments"
      v-if="paymentMethod.length > 0 && paymentMethod.some((n) => n === 'card')"
      :options="{
        1: '1x, sem juros',
        2: '2x, sem juros',
        3: '3x, sem juros',
      }"
      type="radio"
      name="installments"
      label="Parcelamento em"
    />

    <Progress />

    <Button color="primary-0" buttontext="Próximo" />
  </FormulateForm>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import VueFormulate from "@braid/vue-formulate";
import VMasker from "vanilla-masker";

import Button from "./Button.vue";
import Progress from "./Progress.vue";

Vue.use(VueFormulate);

export default {
  components: { Button, Progress },
  data() {
    return {
      mainSpecialty: null,
      mainSpecialties: [
        "Cardiologia",
        "Dermatologia",
        "Neurologia",
        "Oftalmologia",
        "Psiquiatria",
        "Urologia",
      ],
      consultationFee: null,
      error: false,
      paymentMethod: [],
      cardInstallments: null,
    };
  },
  watch: {
    consultationFee(newValue) {
      this.checkValueRange(newValue);

      this.consultationFee = VMasker.toMoney(this.checkValueRange(newValue), {
        precision: 0,
        separator: ",",
        delimiter: ".",
        unit: "R$",
        zeroCents: true,
      });
    },
  },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
      formValues: "getFormData",
    }),
  },
  methods: {
    handleClickForm(data) {
      this.checkValueRange(this.consultationFee);
      if (!this.error) {
        this.$store.commit("saveFormData", data);
        this.$store.commit("incrementStep");
      }
    },
    setError(message) {
      this.$formulate.handle(
        {
          inputErrors: {
            consultationFee: message,
          },
        },
        // eslint-disable-next-line
        "step2"
      );
    },
    checkValueRange(newValue) {
      let value = Number(newValue.replace("R$ ", "").replaceAll(",", ""));
      if (value < 30 || value > 350) {
        value = 0;
        this.setError("Valor tem que ser entre R$ 30 e R$ 350");
        this.error = true;
      } else {
        this.setError("");
        this.error = false;
      }

      return newValue;
    },
  },
  mounted() {
    const storedData = this.$store.getters.getFormData;
    if (storedData) {
      if (storedData.specialty) this.mainSpecialty = storedData.specialty;
      if (storedData.consultationFee) {
        this.consultationFee = storedData.consultationFee;
      }
      if (storedData.installments) {
        this.cardInstallments = storedData.installments;
      }
      if (storedData.paymentmethods) {
        this.paymentMethod = storedData.paymentmethods;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.form {
  .formulate-input {
    min-height: toRem(95px);

    &:last-of-type {
      min-height: 0;
    }

    &[data-type="checkbox"] {
      margin-bottom: toRem(40px);

      ::v-deep .formulate-input-group-item {
        background-color: $secondary-1;
        border-radius: toRem(10px);
        margin: toRem(10px) 0;
        padding: toRem(10px) toRem(30px);
        box-shadow: 0px 1px 1px $secondary-3;
      }
    }

    &[data-type="radio"] {
      ::v-deep .formulate-input-label--before {
        margin-bottom: toRem(15px);
      }

      background-color: $secondary-1;
      border-radius: toRem(10px);
      margin: toRem(-60px) 0 toRem(30px);
      padding: toRem(30px) toRem(30px) toRem(10px);
      box-shadow: 0px 1px 1px $secondary-3;
    }

    ::v-deep input[type="text"],
    ::v-deep select {
      width: 100%;
      border: 1px solid $primary-0;
      border-radius: toRem(8px);
      height: toRem(40px);
      padding: toRem(5px) toRem(5px);
    }

    ::v-deep .formulate-input-element[data-type="checkbox"],
    ::v-deep .formulate-input-element[data-type="radio"] {
      width: 20px;
      float: left;
    }
  }

  ::v-deep .formulate-input-errors {
    padding-left: 0;
    margin-bottom: 0;
  }

  ::v-deep [data-is-showing-errors="true"] input,
  ::v-deep [data-is-showing-errors="true"] select {
    border: 1px solid $danger !important;
  }

  ::v-deep .formulate-input-error {
    list-style: none;
    color: $danger;
  }
}
</style>
