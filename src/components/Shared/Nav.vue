<template lang="pug">
    #nav
        router-link(to="/") Inicio
        router-link(to="/about") Buscar
        router-link(to="/input") Ingresar texto
</template>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
