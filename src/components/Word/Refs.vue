<template>
  <section class="references">
    <h4 class="references references__title">Referencias</h4>
    <a
      class="references references__link"
      :href="ref"
      v-for="ref in references"
      :key="ref.id"
      target="_blank"
      >{{ ref }}</a
    >
  </section>
</template>

<script>
export default {
  props: ["references"]
};
</script>

<style lang="scss" scoped>
.references {
  display: block;
  padding: 10px 0;
  overflow-wrap: break-word;

  .references__title {
    font-size: 1.5em;
    margin: 0;
  }

  .references__link {
    &:visited {
      color: rgb(12, 21, 143);
    }
    &:hover {
      color: red;
    }
  }
}
</style>
