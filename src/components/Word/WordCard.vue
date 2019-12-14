<template>
  <div class="root">
    <div class="card__loading" v-if="status === 'pending'">
      <h3 class="loading__title">Cargando...</h3>
    </div>
    <!-- else -->
    <div
      :class="[status === 'success' ? 'card__success' : 'card__error']"
      v-else
    >
      <input
        class="inputWord"
        type="text"
        name="inputWord"
        v-model="localSentence"
        v-if="ui.input.editing"
        @keyup.enter="loadData(localSentence)"
      />

      <div v-if="status === 'success'">
        <h3 class="success__title">
          <strong>Palabra:</strong> {{ localSentence }}
        </h3>
        <p><strong>Tipo:</strong> {{ response.category }}</p>
        <p><strong>Categoría:</strong> {{ response.category_def }}</p>
        <p><strong>Exemple:</strong> {{ response.sentences[0] }}</p>
        <p><strong>Ejemplo:</strong> {{ response.sentences[1] }}</p>

        <refs :references="references" />
      </div>
      <!-- else -->
      <div class="card__error" v-else>
        <h3 class="error__title">Something went wrong!</h3>
        <div class="error__content">
          <p>
            <strong>Error searching word: "{{ localSentence }}"</strong>
          </p>
          <p>{{ error.message }}</p>

          <refs :references="references" />
        </div>
      </div>

      <div class="card__buttons">
        <button class="button--secondary" @click="toggleEditing()">
          {{ ui.button.message }}
        </button>
        <button class="button--primary" @click="loadData(localSentence)">
          Volver a intentar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Refs from "./Refs";

export default {
  props: ["sentence"],

  components: { Refs },

  created() {
    //
    // Avoid mutating prop
    this.localSentence = this.sentence;
    //
    this.loadData(this.localSentence);
  },

  computed: {
    references() {
      return [
        this.$store.state.scrapping.endpoints.wordreference + this.localSentence
      ];
    }
  },

  data() {
    return {
      // status => pending, success, error
      status: "pending",
      //
      // New Sentence
      localSentence: "",
      //
      // UI
      ui: {
        input: {
          editing: false
        },
        button: {
          message: "Modificar palabra"
        }
      },
      //
      // Response from the server
      response: null,

      error: {
        message: ""
      }
    };
  },

  watch: {
    "ui.input.editing": function(val) {
      this.ui.button.message = val
        ? "Cerrar cuadro de edición"
        : "Modificar palabra";
    }
  },

  methods: {
    async loadData(sentence) {
      this.status = "pending";
      this.response = null;

      const html = await this.$store.dispatch("getDefinition", sentence);

      if (html.error) {
        this.status = "error";
        this.error.message = `Ha ocurrido un error al buscar: ${sentence}`;
        return;
      }

      const data = await this.$store.dispatch("scrapp", html.data);

      //
      // Verify response has data
      if (data.category == "") {
        this.status = "error";
        this.error.message = `No se ha encontrado nunguna traducción para: ${sentence}`;
        return;
      }

      this.status = "success";
      this.response = data;
    },

    toggleEditing() {
      this.ui.input.editing = !this.ui.input.editing;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    background-color: #b5f7d9;

    .success__title {
      font-size: 1.5em;
    }
  }

  &__loading {
    @extend .card;
    background-color: rgb(250, 250, 152);
  }

  &__error {
    @extend .card;
    background-color: rgb(255, 214, 206);
    color: rgb(247, 77, 47);

    .error__title {
      font-size: 1.5em;
    }
  }
}

.card__buttons {
  display: flex;
  justify-content: space-between;

  .btn {
    padding: 10px;
    border: none;
  }

  .button--primary {
    @extend .btn;
    background-color: #4758f0;
    color: white;
  }
  .button--secondary {
    @extend .btn;
    background-color: rgb(102, 72, 141);
    color: white;
  }
}

.inputWord {
  padding: 15px;
  border: 1px solid skyblue;
  font-size: 1.5em;
}
</style>
