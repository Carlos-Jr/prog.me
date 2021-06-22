<template>
  <div id="app">
    <div class="columns is-full-height is-2">
      <div class="column is-one-fifth has-background-primary has-text-white">
        <section>
          <div class="buttons" style="padding: 30px">
            <b-button
              type="is-dark"
              expanded
              @click="add_to_code('Ler digital', 'D1')"
              >Ler entrada digital</b-button
            >
            <b-button
              type="is-dark"
              expanded
              @click="add_to_code('Ler analógica', 'A1')"
              >ler entrada analógica</b-button
            >
            <b-button
              type="is-dark"
              expanded
              @click="add_to_code('Escrever digital', 'D2')"
              >Escrever saída digital</b-button
            >
            <b-button
              type="is-dark"
              expanded
              @click="add_to_code('Escrever PWM', 'D3')"
              >Escrever saída PWM</b-button
            >
          </div>
        </section>
      </div>
      <div class="column is-full-height has-background-light has-text-white">
        <simple-flowchart :scene.sync="data_current"></simple-flowchart>
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
import SimpleFlowchart from "vue-simple-flowchart";
import "../assets/flowchart.css";

export default {
  name: "App",
  components: { SimpleFlowchart },
  data() {
    return {
      jsonerror: "",
      data_current: {
        centerX: 100,
        centerY: 100,
        scale: 1,
        nodes: [
          {
            id: 0,
            x: 0,
            y: 0,
            type: "Configurar hardware",
            label: "Configurar",
          },
        ],
        links: [],
      },
    };
  },
  methods: {
    add_to_code(type, label) {
      const new_x = this.data_current.nodes.length * 100;
      this.data_current.nodes.push({
        id: this.data_current.nodes.length,
        x: 150 + new_x,
        y: 150,
        type: type,
        label: label,
      });
      console.log(this.data_current.nodes);
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
.is-full-height {
  min-height: 91vh !important;
}
</style>
