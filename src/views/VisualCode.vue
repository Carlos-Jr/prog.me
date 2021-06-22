<template>
  <div id="app">
    <div class="columns is-2">
      <div class="column is-one-fifth has-background-primary has-text-white">
        <section>
          <b>MOVIMENTO</b>
          <b>I/O</b>
          <b>LÓGICA</b>
        </section>
      </div>
      <div class="column has-background-light has-text-white">
        <p class="title">Código</p>
      </div>
      <div class="column is-one-quarter" v-if="show_arduinoCode">
        <p v-html="arduino_code"></p>
      </div>
      <div class="column is-one-quarter" v-if="show_advancedMode">
        <p>{{ format_jsonFile }}</p>
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
  methods: {},
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
    arduino_code: function () {
      return this.$store.state.arduino_code.replace(/\n/g, "<br />");
    },
  },
};
</script>

<style scoped>
.columns {
  min-height: 91vh !important;
}
</style>
