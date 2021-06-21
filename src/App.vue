<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="./assets/logo.png" alt="Prog.me" />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-dropdown label="Projeto">
          <b-navbar-item @click="new_file"> Novo </b-navbar-item>
          <b-navbar-item @click="launch_openfile"> Abrir </b-navbar-item>
          <b-navbar-item @click="save_file"> Salvar </b-navbar-item>
          <hr class="navbar-divider" />
          <b-navbar-item> Exportar </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-dropdown label="Editor">
          <b-navbar-item @click="switch_stepNumber">
            Mostrar números dos passos <b v-if="show_stepNumber"> OK</b>
          </b-navbar-item>
          <b-navbar-item @click="switch_arduinoCode">
            Exibir código Arduino <b v-if="show_arduinoCode"> OK</b>
          </b-navbar-item>
          <b-navbar-item @click="switch_advancedMode">
            Ver conteúdo avançado <b v-if="show_advancedMode"> OK</b>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <input
          ref="openfileinput"
          accept="*.json"
          type="file"
          style="display: none"
          @change="open_file"
        />
        <b-navbar-item tag="div">
          <router-link to="/"> Configurações </router-link>
        </b-navbar-item>
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
      }
      const fr = new FileReader();

      fr.onload = (e) => {
        this.$store.state.current_file = JSON.parse(e.target.result);
      };
    },
    save_file() {
      const data = JSON.stringify(this.$store.state.current_file);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = this.$store.state.current_file.name + ".json";
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
  },
};
</script>
