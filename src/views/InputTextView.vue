<template lang="pug">
    div
        button.btn.button--primary(@click="analyze()") Analizar

        input(id="textarea"
              type="textarea" 
              placeholder="Ingresa el texto a analizar" 
              v-model="input.text" 
              @keyup.enter="analyze()")

        //- The component must be mounted, that's why v-show
        List(ref="list" :ppList="words" v-show="words")

</template>

<script>
import List from "@/components/Word/List";

export default {
  components: { List },

  data() {
    return {
      input: {
        text: null
      },
      words: []
    };
  },

  methods: {
    analyze() {
      this.words = [];

      if (!this.input.text) return;

      const arr = this.input.text.split(" ");

      // HACK: Without the setTimeout function Vue does not detect the array changes
      setTimeout(() => {
        for (let w of arr) {
          this.words.push(w);
        }

        if (this.words[0] === "") {
          this.words = [];
          return;
        }

        this.words = this.$store.getters.toLowerCase(arr);
        this.words = this.$store.getters.removeDuplicates(this.words);
      }, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
#textarea,
textarea {
  display: block;
  outline: none;
  width: 100%;
  font-size: 1.3em;
  border: solid 3px transparent;
  border-radius: 6px;
  padding: 10px;
  transition: border 0.5s;
  box-sizing: border-box;

  &:focus,
  textarea:focus {
    border: solid 3px rgb(97, 189, 212);
  }
}
</style>
