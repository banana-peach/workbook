<template>
  <div>
    <h2>在线微信聊天室</h2>
  </div>
</template>

<script>
export default {
  name: "Wechat",
  mounted() {
    const socket = new WebSocket("ws://localhost:9999");

    // Connection opened
    socket.addEventListener("open", function (event) {
      console.log("socket 打开");
      socket.send("Hello Server!");

      socket.send("Hello server!");

    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      console.log("Message from server ", event.data);
    });
  }
};
</script>

<style scoped>

</style>
