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
                <b-button
                  type="is-info"
                  class="box"
                  expanded
                  @click="add_to_code(4, '>', 0, 'Se ...')"
                  >Condição</b-button
                >
              </div>
            </b-tab-item>
            <b-tab-item label="Robô"></b-tab-item>
            <b-tab-item label="Drone"></b-tab-item>
          </b-tabs>
        </section>
      </div>
      <div class="column has-background-light has-text-white box">
        <draggable group="blocos" :list="data_current" @change="log">
          <div v-for="element in data_current" :key="'btni_' + element.id">
            <div
              v-if="element.type < 4"
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
            <!-- Caso bloco de IF -->
            <div v-if="element.type == 4">
              <div class="box is-condition">
                Se o valor for
                <b
                  style="cursor: pointer"
                  @click="
                    get_new_value(
                      element,
                      'pin',
                      'Qual condição deseja utilizar?'
                    )
                  "
                  >{{ element.pin }}</b
                >

                <b
                  style="cursor: pointer"
                  @click="
                    get_new_value(
                      element,
                      'value',
                      'Qual o novo valor para escrever no pino?'
                    )
                  "
                >
                  {{ element.value }}</b
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
              <div class="conditional-block">
                <draggable
                  class="conditional-block-area"
                  @change="log"
                  :list="element.blocks"
                  group="blocos"
                >
                  <div
                    v-for="inner_element in element.blocks"
                    :key="'btni_inner_' + inner_element.id"
                  >
                    <div
                      v-if="inner_element.type < 4"
                      :class="{
                        box: true,
                        'is-write': inner_element.type >= 2,
                        'is-read': inner_element.type < 2,
                      }"
                    >
                      {{ inner_element.label }} no pino
                      <b
                        style="cursor: pointer"
                        @click="
                          get_new_value(
                            inner_element,
                            'pin',
                            'Qual o pino deseja utilizar?'
                          )
                        "
                        >{{ inner_element.pin }}</b
                      >
                      <span v-if="inner_element.type >= 2"
                        >, o valor
                        <b
                          style="cursor: pointer"
                          @click="
                            get_new_value(
                              inner_element,
                              'value',
                              'Qual o novo valor para escrever no pino?'
                            )
                          "
                          >{{ inner_element.value }}</b
                        ></span
                      >
                      <a
                        @click="remove_from_code(inner_element.id)"
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
                  </div>
                </draggable>
              </div>
            </div>
            <!-- FIM do Caso bloco IF -->
          </div>
        </draggable>
      </div>
      <div
        class="column is-one-quarter"
        style="padding: 40px"
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
    log: function (evt) {
      window.console.log(evt);
    },
    get_new_value(variable, propety, label) {
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
      let total_blocos = this.data_current.length;
      this.data_current.forEach(function (elemento) {
        total_blocos += elemento.blocks.length;
      });
      console.log("blocos na tela:", total_blocos);
      this.data_current.push({
        id: total_blocos,
        type: type,
        pin: pin,
        value: value,
        label: label,
        blocks: [],
        var: "variavel_" + this.data_current.length,
      });
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
      return this.$store.state.arduino_code
        .replace(/\n/g, "<br />")
        .replace(/\t/g, "&emsp;");
    },
    current_file: function () {
      return this.$store.state.current_file.content;
    },
  },
  watch: {
    data_current: function () {
      this.$store.state.current_file.content = this.data_current;
      this.$store.state.arduino_code = "";
      let loop_code = "";
      let setup_pins = [];
      let setup_code = "";
      for (let index = 0; index < this.data_current.length; index++) {
        const element = this.data_current[index];
        //Se o pino não foi configurado no SETUP, configura
        let need_config = setup_pins.findIndex(function (i) {
          return i === element.pin;
        });
        if (need_config == -1) {
          setup_pins.push(element.pin);
          if (element.type < 2)
            setup_code += "\t pinMode(" + element.pin + ",INPUT);\n";
          else if (element.type < 4)
            setup_code += "\t pinMode(" + element.pin + ",OUTPUT);\n";
        }
        // adiciona os comandos no loop
        if (element.type == 0) {
          loop_code +=
            "\tbool " + element.var + " = digitalRead(" + element.pin + ");\n";
        } else if (element.type == 1) {
          loop_code +=
            "\tint " + element.var + " = analogRead(" + element.pin + ");\n";
        } else if (element.type == 2) {
          loop_code +=
            "\tdigitalWrite(" + element.pin + "," + element.value + ");\n";
        } else if (element.type == 3) {
          loop_code +=
            "\t analogWrite(" + element.pin + "," + element.value + ");\n";
        } else if (element.type == 4) {
          if (index > 0) {
            if (this.data_current[index - 1].type < 2) {
              let variable = this.data_current[index - 1].var;
              loop_code +=
                "\tif(" + variable + element.pin + element.value + "){\n";

              for (let j = 0; j < element.blocks.length; j++) {
                //Se o pino não foi configurado no SETUP, configura
                let need_config = setup_pins.findIndex(function (i) {
                  return i === element.blocks[j].pin;
                });
                if (need_config == -1) {
                  setup_pins.push(element.blocks[j].pin);
                  if (element.blocks[j].type < 2)
                    setup_code +=
                      "\t pinMode(" + element.blocks[j].pin + ",INPUT);\n";
                  else if (element.blocks[j].type < 4)
                    setup_code +=
                      "\t pinMode(" + element.blocks[j].pin + ",OUTPUT);\n";
                }
                if (element.blocks[j].type == 0)
                  loop_code +=
                    "\t\t bool " +
                    element.blocks[j].var +
                    " = digitalRead(" +
                    element.blocks[j].pin +
                    ");\n";
                else if (element.blocks[j].type == 1)
                  loop_code +=
                    "\t\t int " +
                    element.blocks[j].var +
                    " = analogRead(" +
                    element.blocks[j].pin +
                    ");\n";
                else if (element.blocks[j].type == 2)
                  loop_code +=
                    "\t\t digitalWrite(" +
                    element.blocks[j].pin +
                    "," +
                    element.blocks[j].value +
                    ");\n";
                else if (element.blocks[j].type == 3)
                  loop_code +=
                    "\t\t analogWrite(" +
                    element.blocks[j].pin +
                    "," +
                    element.blocks[j].value +
                    ");\n";
              }

              loop_code += "\n\t}\n";
            }
          }
        }
      }
      this.$store.state.arduino_code =
        "void setup( ){\n " +
        setup_code +
        "}\n \nvoid loop( ){\n" +
        loop_code +
        "\n}\n";
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
  max-width: 40vw;
  color: #fff;
  margin: 10px;
}
.is-read {
  background-color: #ffe08a;
  max-width: 40vw;
  color: rgba(0, 0, 0, 0.7);
  margin: 10px;
}
.is-condition {
  background-color: #3488ce;
  max-width: 40vw;
  color: #fff;
  margin: 10px;
}
.conditional-block {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  background-color: #eff5fb;
  max-width: 40vw;
  min-height: 100px;
  color: rgba(0, 0, 0, 0.7);
  margin: 10px;
  padding: 10px;
}
.conditional-block-area {
  max-width: 30vw;
  min-height: 100px;
  color: rgba(0, 0, 0, 0.7);
  margin-left: auto;
}
.tabs a:hover {
  border-bottom-color: white !important;
}
.tabs a {
  border-bottom-color: white !important;
}
</style>
