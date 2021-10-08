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

    <div class="form__progress row ms-0 mt-3">
      <div class="progress col p-0">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: step * 50 + '%' }"
          :aria-valuenow="step * 50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span class="col-4 col-sm-3 col-md-2 text-end">{{ step }} de 2</span>
    </div>
    <Button buttontext="Próximo" />
  </FormulateForm>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import VueFormulate from "@braid/vue-formulate";
import VMasker from "vanilla-masker";

import Button from "./Button.vue";

Vue.use(VueFormulate);

export default {
  components: { Button },
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
      formValues: {
        cpf: "416.137.098-97",
        telephone: "(11) 9 4486-4799",
        state: "PR",
        city: "Londrina",
        name: "Luiz Gustavo Amorim de Paula",
      },
    };
  },
  computed: {
    ...mapGetters({
      step: "getActiveStep",
    }),
  },
  methods: {
    handleClickForm(data) {
      this.formValues = Object.assign(this.formValues, data);
      this.$store.commit("incrementStep", 1);
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
