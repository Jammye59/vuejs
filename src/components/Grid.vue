<template>
  <div class="sudoku">
    <template v-for="(value, index) in this.$store.state.cells">
      <Cell :index="index" />
    </template>
  </div>
</template>

<script>
import Cell from "./Cell.vue";
export default {
  name: "Grid",
  components: {
    Cell,
  },
  mounted() {
    console.log("grid");
    console.log(this.$store.state.cells);
  },
};
</script>

<style scoped>
.sudoku {
  display: flex;
  flex-flow: row wrap;
  width: calc((var(--cell-size) + 2px) * 9 + 6px);
  border: solid 4px var(--foreground);
  margin-bottom: 20px;
}
</style>
