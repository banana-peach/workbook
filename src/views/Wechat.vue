<template>
  <div>
    <h2>在线微信聊天室</h2>
  </div>
</template>

<script>
export default {
  name: "Wechat",
  data() {
    return {
      ws: null
    };
  },
  mounted() {
    // this.ws = new WebSocket("ws://192.168.3.21:9000");
    this.WebSocketTest();
  },
  methods: {
    WebSocketTest() {
      if ("WebSocket" in window) {
        // alert("您的浏览器支持 WebSocket!");

        // 打开一个 web socket
        var ws = new WebSocket("ws://192.168.3.21:3000");

        ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send("发送数据, 收到了吗");
          console.log(("数据发送中..."));
        };

        ws.onmessage = function (evt) {
          const received = evt.data;
          console.log(received);
          console.log(("数据已接收..."));
        };

        ws.onclose = function () {
          // 关闭 websocket
          console.log(("连接已关闭..."));
        };
      } else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
      }
    }
  }
};
</script>

<style scoped>

</style>
