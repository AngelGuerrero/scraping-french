<template lang="pug">
  .root
    .card__loading(v-if="status === 'pending'")
      h3.loading__title Cargando...
    //- v-else
    div(:class="[status === 'success' ? 'card__success' : 'card__error']" v-else)
      //- Header of the card
      input(class="inputWord"
            type="text"
            v-model="sentence"
            v-if="control.input.editing"
            @keyup.enter="loadData(sentence)")
      
      //- Main content of the card
      div(v-if="status === 'success'")
        h3.success__title Palabra: {{ sentence }}
        div
          p
            strong Tipo:
            |  {{ response.category }}
          p
            strong Definición de categoría:
            |  {{ response.category_def }}
          p
            strong Exemple:
            |  {{ response.sentences[0] }}
          p
            strong Ejemplo:
            |  {{ response.sentences[1] }}
        refs(:references="getReferences")
      div.card__error(v-else)
        h3.error__title Something went wrong!
        .error__content
          p
            strong Error searching word: "{{ sentence }}"
          p {{ error.message }}
          refs(:references="getReferences")

      //- Footer of the card
      .card__buttons
        button.button--warning(@click="toggleEditing()") {{ control.button.message }}
        button.button--primary(@click="loadData(sentence)") Volver a intentar

</template>

<script>
import Refs from "./Refs";

export default {
  props: {
    ppSentence: {
      type: String,
      require: true
    }
  },

  components: { Refs },

  mounted() {
    this.loadData(this.sentence);
  },

  computed: {
    getReferences() {
      return [
        this.$store.state.scrapping.endpoints.wordreference + this.sentence
      ];
    }
  },

  data() {
    return {
      //
      // Avoid mutating prop
      sentence: this.ppSentence,

      // status => pending, success, error
      status: "pending",

      control: {
        input: {
          editing: false
        },
        button: {
          message: "Modificar palabra"
        }
      },

      // Response from the server
      response: null,

      error: {
        message: ""
      }
    };
  },

  watch: {
    "control.input.editing": function(val) {
      this.control.button.message = val
        ? "Cerrar cuadro de edición"
        : "Modificar palabra";
    }
  },

  methods: {
    async loadData(pSentence) {
      this.restoreStateComponent(pSentence);

      const html = await this.$store.dispatch("getDefinition", pSentence);

      if (html.error) {
        this.status = "error";
        this.error.message = `Ha ocurrido un error al buscar: ${pSentence}`;
        return;
      }

      const data = await this.$store.dispatch("scrapp", html.data);

      //
      // Verify response has data
      if (data.category == "") {
        this.status = "error";
        this.error.message = `No se pudo obtener traducción para: ${pSentence}`;
        return;
      }

      this.status = "success";
      this.response = data;
    },

    toggleEditing() {
      this.control.input.editing = !this.control.input.editing;
    },

    restoreStateComponent(pSentence) {
      this.sentence = pSentence;
      this.status = "pending";
      this.response = null;
      this.control.input.editing = false;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/partials/variables.scss";

.card {
  padding: 5px;
  margin: 10px 0;
  border-radius: 3px;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
}

.card {
  &__success {
    @extend .card;
    background-color: $card-dark-bg;

    .success__title {
      font-size: 1.5em;
    }
  }

  &__loading {
    @extend .card;
    background-color: $card-dark-bg-loading;
  }

  &__error {
    @extend .card;
    background-color: $card-dark-bg-error;
    color: $text-color;

    .error__title {
      font-size: 1.5em;
    }
  }
}

.card__buttons {
  display: flex;
  justify-content: space-between;
}

.inputWord {
  padding: 15px;
  border: 1px solid skyblue;
  font-size: 1.5em;
}
</style>
