<template>
  <div class="home">
    <ListWords />
  </div>
</template>

<script>
import ListWords from "@/components/Word/List.vue";

export default {
  name: "home",

  components: {
    ListWords
  }
};
</script>
