<template>
  <div id="app">
    <div v-resize></div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  directives: {
    resize: {
      mounted() {
        console.log("bind")
      },
      inserted() {
        console.log("inserted")
      },
      update() {
        console.log("update")
      },
      componentUpdated() {
        console.log("componentUpdated")
      },
      unbind() {
        console.log("unbind")
      },
    },
  },
};
</script>
