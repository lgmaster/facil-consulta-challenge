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
    <FormulateInput
      v-model="selectedState"
      :options="{
        PR: 'Paraná',
        SP: 'São Paulo',
        SC: 'Santa Catarina',
        RS: 'Rio Grande do Sul',
      }"
      type="select"
      placeholder="Selecione"
      label="Estado*"
      validation="required"
      :validation-messages="{ required: 'Estado é obrigatório' }"
    />
    <FormulateInput
      v-model="selectedCity"
      :options="cities[selectedState]"
      type="select"
      placeholder="Selecione"
      label="Cidade*"
      validation="required"
      :validation-messages="{ required: 'Cidade é obrigatório' }"
    />

    <div class="form__progress">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 50%"
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
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
        SP: ["São Paulo"],
        PR: ["Curitiba"],
        SC: ["Florianópolis"],
        RS: ["Pelotas"],
      },
    };
  },
};
</script>

<style>
</style>
