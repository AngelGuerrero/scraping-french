<template>
  <div>
    <h4>Total de palabras: {{ items.length }}</h4>

    <!-- <button @click="orderByCategory()">Ordenar alfabéticamente</button>
    <button @click="toggleButtonGroupByCategory()">
      {{ showByCategory.message }}
    </button> -->

    <main>
      <section class="card__group">
        <WordCard v-for="word in items" :sentence="word" :key="word.id" />
      </section>
      <!-- <section class="card" v-else>
        <WordCard v-for="result in results" :result="result" :key="result.id" />
      </section> -->
    </main>
  </div>
</template>

<script>
import WordCard from "./WordCard";

export default {
  data() {
    return {
      //
      // UI - Controls
      showByCategory: {
        message: "Agrupar por categoría",
        state: false
      },
      //
      // Iterate over items
      items: []
    };
  },

  components: {
    WordCard
  },

  created() {
    //
    // Change to lowerCase
    this.items = this.$store.getters.toLowerCase(
      this.$store.state.common.words
    );
    //
    // Remove duplicates
    this.items = this.$store.getters.removeDuplicates(this.items);
  }

  // methods: {
  //   toggleButtonGroupByCategory() {
  //     this.groupByCategory();
  //     this.showByCategory.state = !this.showByCategory.state;
  //     this.showByCategory.message =
  //       this.showByCategory.state == true
  //         ? "Desagrupar"
  //         : "Agrupar por categoría";
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.card__group {
  max-width: 1000px;
}

button {
  margin: 10px 0;
}

.group__title {
  color: tomato;
}
</style>
