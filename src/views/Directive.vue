<template>
  <div id="app">
    <div v-resize></div>
    <input v-focus type="text" name="">
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  directives: {
    resize: {
      mounted() {
        console.log("bind");
      },
      inserted() {
        console.log("inserted");
      },
      update() {
        console.log("update");
      },
      componentUpdated() {
        console.log("componentUpdated");
      },
      unbind() {
        console.log("unbind");
      },
    },
    focus: {
      mounted(el) {
        el.focus();
        console.log("bind");
      },
      inserted() {
        console.log("inserted");
      },
      update() {
        console.log("update");
      },
      componentUpdated() {
        console.log("componentUpdated");
      },
      unbind() {
        console.log("unbind");
      },
    },
  },
};
</script>
