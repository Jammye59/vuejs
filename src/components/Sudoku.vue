<template>
  <div class="title">Sudoku CyberLib</div>
  <div :class="$store.state.success ? 'success' : 'error'">
    {{ $store.state.msg }}
  </div>

  <Grid v-if="start"></Grid>
  <div class="btn">
    <button @click="newGame()" v-if="!start">Nouvelle partie</button>
    <button @click="validation()" v-if="start">Valider</button>
    <button @click="solve()" v-if="start">Résoudre</button>
    <button @click="reset()" v-if="start">Reset</button>
  </div>
</template>

<script>
import Grid from "./Grid.vue";
import "bootstrap";
import axios from "axios";

export default {
  name: "Sudoku",
  components: {
    Grid: Grid,
  },
  props: {},
  methods: {
    reset() {
      this.$store.commit("reset");
    },
    validation() {
      const state = this.$store.state;
      console.log("start");
      console.log(state);
      console.log("end");
      axios
        .get("https://www.jsonkeeper.com/b/W8I7I")
        //.post("https://develter.tech/sudoku/validation", {
        //  grid: this.$store.state.response,
        //})
        .then(function (response) {
          state.success = response.data.result;
          if (state.success) {
            state.msg = "Votre grille est valide";
          } else {
            state.msg = "Grille invalide";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    solve() {
      const cells = this.$store.state.cells;
      axios
        .get("https://www.jsonkeeper.com/b/JFAOM", {
          //.post("https://develter.tech/sudoku/solve", {
          //.get("https://www.jsonkeeper.com/b/JFAOM", {
          //  grid: this.$store.state.json,
        })
        .then(function (response) {
          let i = 0;
          response.data.forEach((line, index) => {
            line.forEach((col, index1) => {
              cells[i].solution = col;
              if (col != cells[i].value) {
                cells[i].error = true;
                cells[i].value = col;
              } else {
                cells[i].valid = true;
              }
              i++;
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newGame() {
      this.$store.commit("init");
      axios.get("https://www.jsonkeeper.com/b/ZRHTQ").then((response) => {
        //axios.get("https://lavette-postaxial-unneedfully.ngrok-free.dev/sudoku/new").then((response) => {
        //axios.get("https://develter.tech/sudoku/new").then((response) => {
        //axios.get("https://develter.tech/new.json").then((response) => {
        this.$store.state.json = response.data;
        response.data.forEach((line, index) => {
          line.forEach((col, index1) => {
            this.$store.state.cells.push({
              row: index + 1,
              col: index1 + 1,
              value: col,
              solution: col,
              disabled: col == 0 ? false : true,
              isActive: false,
              error: false,
              valid: false,
            });
          });
        });
        this.start = true;
      });
    },
  },
  data() {
    return {
      start: false,
    };
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #077b8a;
  font-weight: bold;
  font-size: 24px;
}

.btn {
  text-align: center;
}

.btn button {
  margin: 5px;
  padding: 10px 20px;
  background: #077b8a;
  color: #fff;
  border: 0;
}

.success,
.error {
  font-weight: bold;
  padding-bottom: 20px;
  text-align: center;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
