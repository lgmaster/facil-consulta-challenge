<template>
  <FormulateForm
    :values="formValues"
    @submit="handleClickForm"
    class="col form"
  >
    <FormulateInput
      type="text"
      name="name"
      label="Nome completo*"
      validation="required"
      :validation-messages="{ required: 'Nome é obrigatório' }"
    />
    <FormulateInput
      v-model="inputMaskValue.doc"
      @keyup="inputMask('doc', $event)"
      type="text"
      name="cpf"
      label="CPF*"
      validation="required"
      :validation-messages="{ required: 'CPF é obrigatório' }"
      autocomplete="none"
    />
    <FormulateInput
      v-model="inputMaskValue.tel"
      @keyup="inputMask('tel', $event)"
      type="tel"
      name="telephone"
      label="Número de celular*"
      validation="required|matches:/[0-9]/"
      :validation-messages="{ required: 'Telefone é obrigatório', matches: '' }"
      autocomplete="none"
    />

    <div class="form__selects row">
      <FormulateInput
        v-model="selectedState"
        name="state"
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
        name="city"
        :options="cities[selectedState]"
        type="select"
        placeholder="Selecione"
        label="Cidade*"
        validation="required"
        :validation-messages="{ required: 'Cidade é obrigatório' }"
        :disabled="!selectedState"
        class="col"
      />
    </div>

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
      selectedState: null,
      selectedCity: null,
      cities: {
        PR: ["Londrina", "Maringá"],
        SC: ["Florianópolis", "Joinville"],
        RS: ["Pelotas", "Porto Alegre"],
      },
      inputMaskValue: {
        tel: null,
        doc: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
      formValues: "getFormData",
    }),
  },
  methods: {
    handleClickForm(data) {
      this.$store.commit("saveFormData", data);
      this.$store.commit("incrementStep");
    },
    inputMask(type, event) {
      const masks = {
        tel: "(99) 9 9999-9999",
        doc: "999.999.999-99",
      };

      const elTarget = event.target;
      const v = elTarget.value.replace(/\D/g, "");

      VMasker(elTarget).unMask();
      VMasker(elTarget).maskPattern(masks[type]);

      this.inputMaskValue[`${type}`] = VMasker.toPattern(v, masks[`${type}`]);
    },
  },
  mounted() {
    const storedData = this.$store.getters.getFormData;
    if (storedData) {
      this.inputMaskValue.tel = storedData.telephone;
      this.inputMaskValue.doc = storedData.cpf;
      this.selectedState = storedData.state;
      this.selectedCity = storedData.city;
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

    ::v-deep input[type="text"],
    ::v-deep input[type="tel"],
    ::v-deep select {
      width: 100%;
      border: 1px solid $primary-0;
      border-radius: toRem(8px);
      height: toRem(40px);
      padding: toRem(5px) toRem(5px);
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
