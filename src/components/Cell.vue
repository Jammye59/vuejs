<template>
  <div
    @click="chooseCell()"
    @keydown.enter="enterSolution()"
    class="cell"
    :class="
      'row-' +
      $store.state.cells[index].row +
      ' col-' +
      $store.state.cells[index].col +
      ($store.state.cells[index].isActive ? ' highlight' : '') +
      ($store.state.cells[index].disabled ? ' disabled' : '') +
      ($store.state.cells[index].error ? ' has-error' : '') +
      ($store.state.cells[index].valid ? ' has-valid' : '')
    "
  >
    <span v-if="$store.state.cells[index].value != 0">{{
      $store.state.cells[index].value == 0
        ? ""
        : $store.state.cells[index].value
    }}</span>
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: ["index"],
  created: function () {
    window.addEventListener("keyup", this.enterSolution);
  },
  methods: {
    chooseCell() {
      this.$store.commit("clearHighlight");

      if (this.$store.state.cells[this.index].disabled) {
        return;
      }
      this.$store.state.cells[this.index].isActive = true;
    },
    enterSolution(e) {
      if (
        /[1-9]/.test(e.key) &&
        this.$store.state.cells[this.index].isActive &&
        !this.$store.state.cells[this.index].disabled
      ) {
        this.$store.state.cells[this.index].value = e.key;
        this.$store.state.cells[this.index].isActive = false;
      }
      this.$store.commit("constructResponse");
    },
  },
};
</script>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cell-size);
  height: var(--cell-size);
  border: solid 1px var(--foreground);
  position: relative;
  text-align: center;
}

.cell.highlight {
  background: #a2d5c6;
}

.cell.has-error {
  color: #d72631;
}

.cell.has-valid {
  color: green;
}

.cell.disabled {
  color: #000;
  background: #ddd;
}

.cell.col-3,
.cell.col-6 {
  border-right-width: 4px;
}

.cell.row-3,
.cell.row-6 {
  border-bottom-width: 4px;
}
</style>
