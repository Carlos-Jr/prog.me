<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="./assets/logo.png" width="112" height="28" />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Arquivo </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> Novo </a>
              <a class="navbar-item"> Abrir projeto </a>
              <a class="navbar-item"> Salvar projeto </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Exportar código Arduino</a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Código </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" @click="switch_stepNumber">
                Mostrar números dos passos
                <b v-if="show_stepNumber"> OK</b>
              </a>
              <a class="navbar-item" @click="switch_arduinoCode">
                Exibir código Arduino <b v-if="show_arduinoCode"> OK</b>
              </a>
              <a class="navbar-item" @click="switch_advancedMode">
                Ver estrutura avançada <b v-if="show_advancedMode"> OK</b>
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/visualcode">visualcode</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    switch_advancedMode() {
      this.$store.commit("switch_advancedMode");
    },
    switch_arduinoCode() {
      this.$store.commit("switch_arduinoCode");
    },
    switch_stepNumber() {
      this.$store.commit("switch_stepNumber");
    },
  },
  computed: {
    show_stepNumber: function () {
      return this.$store.state.show_stepNumber;
    },
    show_arduinoCode: function () {
      return this.$store.state.show_arduinoCode;
    },
    show_advancedMode: function () {
      return this.$store.state.show_advancedMode;
    },
  },
};
</script>
