<template>
  <div id="app">
    <div class="columns">
      <div class="column is-one-quarter">
        <section class="hero is-primary is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="">
              <p class="title">Blocos</p>
              <p class="subtitle">Fullheight subtitle</p>
            </div>
          </div>
        </section>
      </div>
      <div class="column">
        <section class="hero is-light is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="">
              <p class="title">Código</p>
            </div>
          </div>
        </section>
      </div>
      <div class="column" v-if="show_arduinoCode">
        <section class="hero is-light is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="">
              <p class="title">Código Arduino</p>
            </div>
          </div>
        </section>
      </div>
      <div class="column" v-if="show_advancedMode">
        <section class="hero is-light is-fullheight-with-navbar">
          <div class="hero-body">
            <div class="">
              <p>{{ format_jsonFile }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return { jsonerror: "" };
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
    format_jsonFile: function () {
      return JSON.stringify(this.$store.state.current_file, null, 2);
    },
  },
};
</script>
