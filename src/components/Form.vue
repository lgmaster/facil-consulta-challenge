<template>
  <FormulateForm :values="formValues" class="col form">
    <FormulateInput
      type="text"
      name="name"
      label="Nome completo*"
      validation="required"
      :validation-messages="{ required: 'Nome é obrigatório' }"
    />
    <FormulateInput
      type="text"
      name="cpf"
      label="CPF*"
      validation="required"
      :validation-messages="{ required: 'CPF é obrigatório' }"
    />
    <FormulateInput
      type="text"
      name="telephone"
      label="Número de celular*"
      validation="required"
      :validation-messages="{ required: 'Telefone é obrigatório' }"
    />

    <div class="form__selects row">
      <FormulateInput
        v-model="selectedState"
        :options="{
          PR: 'Paraná',
          SC: 'Santa Catarina',
          RS: 'Rio Grande do Sul',
        }"
        type="select"
        placeholder="Selecione"
        label="Estado*"
        validation="required"
        :validation-messages="{ required: 'Estado é obrigatório' }"
        class="col"
      />
      <FormulateInput
        v-model="selectedCity"
        :options="cities[selectedState]"
        type="select"
        placeholder="Selecione"
        label="Cidade*"
        validation="required"
        :validation-messages="{ required: 'Cidade é obrigatório' }"
        class="col"
      />
    </div>

    <div class="form__progress row ms-0 mt-3">
      <div class="progress col p-0">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="col-4 col-sm-3 col-md-2 text-end">1 de 2</span>
    </div>

    <FormulateInput type="submit" label="Próximo" />
  </FormulateForm>
</template>

<script>
import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
import { pt } from "@braid/vue-formulate-i18n";

Vue.use(VueFormulate, {
  plugins: [pt],
  locale: "pt",
});

export default {
  data() {
    return {
      selectedState: null,
      selectedCity: null,
      cities: {
        PR: ["Londrina", "Maringá"],
        SC: ["Florianópolis", "Joinville"],
        RS: ["Pelotas", "Porto Alegre"],
      },
    };
  },
};
</script>

<style lang="scss">
.form {
  .formulate-input {
    min-height: toRem(95px);

    &:last-of-type {
      min-height: 0;
    }

    input,
    select {
      width: 100%;
      border: 1px solid $primary-0;
      border-radius: toRem(8px);
      height: toRem(40px);
      padding: toRem(5px) toRem(5px);
    }
  }

  &__progress {
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

  button {
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

  .formulate-input-errors {
    padding-left: 0;
    margin-bottom: 0;
  }

  [data-is-showing-errors="true"] input,
  [data-is-showing-errors="true"] select {
    border: 1px solid $danger;
  }

  .formulate-input-error {
    list-style: none;
    color: $danger;
  }
}
</style>
