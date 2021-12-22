<template>
  <div id="app">
    <div class="columns is-2 is-full-height">
      <div class="column is-one-fifth has-background-dark">
        <section>
          <b-tabs position="is-centered" class="block">
            <b-tab-item label="Arduino">
              <div class="buttons" style="padding: 30px">
                <b-button
                  type="is-warning"
                  class="box"
                  expanded
                  @click="add_to_code(0, '1', 0, 'Ler entrada digital')"
                  >Ler entrada digital</b-button
                >
                <b-button
                  type="is-warning"
                  class="box"
                  expanded
                  @click="add_to_code(1, 'A1', 0, 'Ler entrada analógica')"
                  >Ler entrada analógica</b-button
                >
                <b-button
                  type="is-danger"
                  class="box"
                  expanded
                  @click="add_to_code(2, '1', 0, 'Escrever saída digital')"
                  >Escrever saída digital</b-button
                >
                <b-button
                  type="is-danger"
                  class="box"
                  expanded
                  @click="add_to_code(3, '5', 0, 'Escrever saída PWM')"
                  >Escrever saída PWM</b-button
                >
              </div>
            </b-tab-item>
            <b-tab-item label="Robô"></b-tab-item>
            <b-tab-item label="Drone"></b-tab-item>
          </b-tabs>
        </section>
      </div>
      <div class="column has-background-light has-text-white box">
        <draggable v-model="data_current">
          <transition-group>
            <div
              v-for="element in data_current"
              :key="'btni_' + element.id"
              :class="{
                box: true,
                'is-write': element.type >= 2,
                'is-read': element.type < 2,
              }"
            >
              {{ element.label }} no pino
              <b
                style="cursor: pointer"
                @click="
                  get_new_value(element, 'pin', 'Qual o pino deseja utilizar?')
                "
                >{{ element.pin }}</b
              >
              <span v-if="element.type >= 2"
                >, o valor
                <b
                  style="cursor: pointer"
                  @click="
                    get_new_value(
                      element,
                      'value',
                      'Qual o novo valor para escrever no pino?'
                    )
                  "
                  >{{ element.value }}</b
                ></span
              >
              <a
                @click="remove_from_code(element.id)"
                style="color: rgba(0, 0, 0, 0.25)"
              >
                <b-icon
                  style="float: right"
                  pack="fas"
                  icon="trash"
                  size="is-small"
                >
                </b-icon>
              </a>
            </div>
          </transition-group>
        </draggable>
      </div>
      <div
        class="column is-two-fifth"
        style="padding: 30px"
        v-if="show_arduinoCode"
      >
        <p v-html="arduino_code"></p>
      </div>
      <div class="column is-one-quarter" v-if="show_advancedMode">
        <p>{{ format_jsonFile }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "App",
  components: { draggable },
  data() {
    return {
      jsonerror: "",
      data_current: [],
    };
  },
  methods: {
    get_new_value(variable, propety, label) {
      console.log(variable, propety, label);
      this.$buefy.dialog.prompt({
        message: label,
        inputAttrs: {
          placeholder: variable[propety],
        },
        trapFocus: true,
        onConfirm: (value) => (variable[propety] = value),
      });
    },
    add_to_code(type, pin, value, label) {
      this.data_current.push({
        id: this.data_current.length,
        type: type,
        pin: pin,
        value: value,
        label: label,
        var: "variavel_" + this.data_current.length,
      });
      console.log(this.data_current.nodes);
    },
    remove_from_code(id) {
      this.data_current.splice(
        this.data_current.findIndex(function (i) {
          return i.id === id;
        }),
        1
      );
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
    current_file: function () {
      return this.$store.state.current_file.content;
    },
  },
  watch: {
    data_current: function () {
      this.$store.state.current_file.content = this.data_current;
      this.$store.state.arduino_code = "";
      this.$store.state.arduino_code += "void setup( ){\n}\n \nvoid loop( ){\n";
      for (let index = 0; index < this.data_current.length; index++) {
        const element = this.data_current[index];
        if (element.type == 0)
          this.$store.state.arduino_code +=
            "    bool " +
            element.var +
            " = digitalRead(" +
            element.pin +
            ");\n";
        else if (element.type == 1)
          this.$store.state.arduino_code +=
            "    int " + element.var + " = analogRead(" + element.pin + ");\n";
        else if (element.type == 2)
          this.$store.state.arduino_code +=
            "    digitalWrite(" + element.pin + "," + element.value + ");\n";
        else if (element.type == 3)
          this.$store.state.arduino_code +=
            "    analogWrite(" + element.pin + "," + element.value + ");\n";
      }
      this.$store.state.arduino_code += "\n}";
    },
    current_file: function () {
      this.data_current = this.$store.state.current_file.content;
    },
  },
};
</script>

<style scoped>
.is-full-height {
  min-height: 93vh !important;
}
.box {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
.is-write {
  background-color: #f14668;
  max-width: 30vw;
  color: #fff;
  margin: 10px;
}
.is-read {
  background-color: #ffe08a;
  max-width: 30vw;
  color: rgba(0, 0, 0, 0.7);
  margin: 10px;
}
</style>
