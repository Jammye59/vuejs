<template>
  <div id="app">
    <sudoku />
  </div>
</template>

<script>
import Sudoku from "./components/Sudoku.vue";

export default {
  name: "App",
  components: {
    Sudoku: Sudoku,
  },
};
</script>

<style>
:root {
  --background: #fff;
  --foreground: #000;
  --cell-size: 40px;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Space Mono", Monaco, monospace;
  background: var(--background);
  color: var(--foreground);
  font-size: 16px;
}
</style>
