<template>
  <div class="home has-background-primary">
    <section class="hero is-primary is-full-view">
      <div class="hero-body">
        <div class="card centered-card">
          <div class="card-content">
            <div class="content">
              <img src="../assets/mainVerde.png" alt="Logo Prog.me" />
              <input
                ref="openfileinput"
                accept="*.json"
                type="file"
                style="display: none"
                @change="open_file"
              />
              <br /><br />
              <div class="columns">
                <div class="column">
                  <b-button expanded type="is-dark" @click="launch_openfile"
                    >Carregar projeto salvo</b-button
                  >
                </div>
                <div class="column">
                  <b-button expanded type="is-dark" @click="criar_projeto"
                    >Criar um novo projeto
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return { open_file_now: "" };
  },
  components: {},
  methods: {
    criar_projeto() {
      this.$store.commit("new_file");
      this.$router.push("Code");
    },
    launch_openfile() {
      this.$refs.openfileinput.click();
    },
    open_file(event) {
      const file = event.target.files[0];

      if (!file) {
        this.$buefy.dialog.alert("Erro ao abrir arquivo");
      } else {
        this.$router.push("Code");
        const fr = new FileReader();
        fr.onload = (e) => {
          this.$store.state.current_file = JSON.parse(e.target.result);
        };
        fr.readAsText(file);
      }
    },
  },
};
</script>

<style scoped>
.is-full-view {
  min-height: 91vh !important;
}
.centered-card {
  margin: auto !important;
  text-align: center !important;
  max-width: 50vw !important;
  min-height: 70vh !important;
}
</style>
