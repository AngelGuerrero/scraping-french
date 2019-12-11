import words from "@/data/words";

import axios from "axios";

const state = {
  //
  // Search database words
  words,
  //
  // Unique Words
  uniqueWords: [],
  //
  // Categories
  //
  // - Push a new category when not exists in the array
  categories: [],
  //
  // TODO: Remove this variable
  byCategory: []
};

const mutations = {};

const getters = {
  toLowerCase: () => arr => arr.map(x => x.toLowerCase()),

  removeDuplicates: () => arr => arr.filter((el, pos) => arr.indexOf(el) == pos)
};

const actions = {
  // getDefinitions: (context, arr) => {
  //   for (let word of arr) {
  //     console.log(word);
  //     this.getData(word);
  //   }
  // }

  getDefinition({ rootState }, word) {
    return axios
      .get(rootState.scrapping.endpoints.wordreference + word)
      .then(response => response)
      .catch(error => ({ error }));
  }

  // createCategoryIfNotExist(category) {
  //   // if (this.categories.indexOf(category) === -1) {
  //   //   this.categories.push(category);
  //   //   return;
  //   // }
  // },

  // orderByCategory() {
  //   // this.results.sort((a, b) => {
  //   //   if (a.category === "")
  //   //     this.results.splice(this.results.indexOf(a.category), 1);
  //   //   if (a.category < b.category) return -1;
  //   //   if (a.category > b.category) return 1;
  //   //   return 0;
  //   // });
  // },

  // groupByCategory() {
  //   // this.byCategory = Array.from(this.categories, x => {
  //   //   return { title: x, data: [] };
  //   // });
  //   // this.orderByCategory();
  //   // this.results.map(word => {
  //   //   let index = this.categories.indexOf(word.category);
  //   //   if (index > -1) {
  //   //     this.byCategory[index].data.push({
  //   //       state: word
  //   //     });
  //   //   }
  //   // });
  // }
};

export default {
  state,
  mutations,
  getters,
  actions
};
