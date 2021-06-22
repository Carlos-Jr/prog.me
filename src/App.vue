<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/logo.png" alt="Prog.me" />
        </b-navbar-item>
      </template>
      <template #start v-if="currentRouteName == 'Code'">
        <b-navbar-dropdown label="Projeto">
          <b-navbar-item @click="new_file"> Novo </b-navbar-item>
          <b-navbar-item @click="launch_openfile"> Abrir </b-navbar-item>
          <b-navbar-item @click="save_file"> Salvar </b-navbar-item>
          <hr class="navbar-divider" />
          <b-navbar-item @click="export_file"> Exportar </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Editor">
          <b-navbar-item @click="switch_stepNumber">
            <b-icon
              pack="fas"
              icon="check"
              size="is-small"
              v-if="show_stepNumber"
            >
            </b-icon>
            <p>Mostrar números nos passos</p>
          </b-navbar-item>
          <b-navbar-item @click="switch_arduinoCode">
            <b-icon
              pack="fas"
              icon="check"
              size="is-small"
              v-if="show_arduinoCode"
            >
            </b-icon>
            <p>Exibir código Arduino</p>
          </b-navbar-item>
          <b-navbar-item @click="switch_advancedMode">
            <b-icon
              pack="fas"
              icon="check"
              size="is-small"
              v-if="show_advancedMode"
            >
            </b-icon>
            <p>Ver conteúdo avançado</p>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end v-if="currentRouteName == 'Code'">
        <input
          ref="openfileinput"
          accept="*.json"
          type="file"
          style="display: none"
          @change="open_file"
        />
        <b-navbar-item tag="div">
          <b-button type="is-light">
            <p>
              <a @click="prompt_close"
                ><b-icon
                  pack="fas"
                  icon="window-close"
                  size="is-medium"
                ></b-icon
              ></a>
              <a @click="prompt_name"
                >&nbsp;&nbsp;&nbsp;&nbsp;Editando "{{ file_name }}"</a
              >
            </p>
          </b-button>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <a class="button is-ghost">Configurações </a></b-navbar-item
        >
        <b-navbar-item tag="div">
          <a class="button is-primary" @click="send_file"> Enviar </a>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    prompt_name() {
      this.$buefy.dialog.prompt({
        message: "Qual o novo nome para o projeto?",
        inputAttrs: {
          placeholder: this.$store.state.current_file.name,
          maxlength: 50,
        },
        trapFocus: true,
        onConfirm: (value) => (this.$store.state.current_file.name = value),
      });
    },
    prompt_close() {
      this.$buefy.dialog.confirm({
        message:
          "Tem certeza que quer fechar o arquivo atual? (alterações não salvas serão perdidas)",
        type: "is-danger",
        confirmText: "Fechar",
        hasIcon: true,
        onConfirm: () => this.$router.push("/"),
      });
    },
    switch_advancedMode() {
      this.$store.commit("switch_advancedMode");
    },
    switch_arduinoCode() {
      this.$store.commit("switch_arduinoCode");
    },
    switch_stepNumber() {
      this.$store.commit("switch_stepNumber");
    },
    new_file() {
      this.$buefy.dialog.confirm({
        title: "Iniciar novo projeto",
        message:
          "Tem certeza que deseja iniciar um novo projeto? (Lembre-se de salvar o atual)",
        type: "is-danger",
        confirmText: "Criar novo",
        hasIcon: true,
        onConfirm: () => this.$store.commit("new_file"),
      });
    },
    launch_openfile() {
      this.$refs.openfileinput.click();
    },
    open_file(event) {
      const file = event.target.files[0];
      if (!file) {
        this.$buefy.dialog.alert("Erro ao abrir arquivo");
      } else {
        // console.log(file);
        const fr = new FileReader();
        fr.onload = (e) => {
          this.$store.state.current_file = JSON.parse(e.target.result);
        };
        fr.readAsText(file);
      }
    },
    save_file() {
      const data = JSON.stringify(this.$store.state.current_file);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      const new_filename = this.$store.state.current_file.name.replace(
        " ",
        "_"
      );
      a.download = new_filename + ".json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    export_file() {
      const data = this.$store.state.arduino_code;
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      const new_filename = this.$store.state.current_file.name.replace(
        " ",
        "_"
      );
      a.download = new_filename + ".ino";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    send_file() {
      this.$buefy.dialog.confirm({
        title: "Enviar arquivo",
        message: "Enviar arquivo para dispositivo?",
        type: "is-danger",
        confirmText: "Enviar",
        hasIcon: true,
        onConfirm: () => this.$buefy.dialog.alert("Serviço indisponível"),
      });
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
    file_name: function () {
      return this.$store.state.current_file.name;
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
