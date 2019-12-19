<template lang="pug">
  div
    h4 Total de palabras {{ ppList.length }}

    section.card__group
      wordCard(v-for="word in ppList"
              :ppSentence="word"
              :key="word"
              ref="words")
</template>

<script>
import WordCard from "./WordCard";

export default {
  props: {
    ppList: {
      type: Array,
      require: true
    }
  },

  components: {
    WordCard
  },

  data() {
    return {
      showByCategory: {
        message: "Agrupar por categoría",
        state: false
      }
    };
  }
};
</script>
