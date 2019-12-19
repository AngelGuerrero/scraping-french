<template>
  <div id="app">
    <Nav />
    <main class="container">
      <section class="main__section">
        <h1>Analizador de texto</h1>
      </section>
      <router-view />
    </main>
  </div>
</template>

<script>
import Nav from "@/components/Shared/Nav";

export default {
  name: "App",

  components: { Nav }
};
</script>
<style lang="scss">
//
// GLOBAL STYLES
@import "@/assets/scss/base.scss";
</style>
