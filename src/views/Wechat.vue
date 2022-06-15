<template>
  <div>
    <h2>在线微信聊天室
      <span @click="start">开启服务</span>
    </h2>
    <div>
      <ul>
        <li v-for="(item, index) in messageLists" :key="index">
          发送人 {{ item.user }}, 消息<i>{{ item.text }}</i>>
        </li>
      </ul>
    </div>
    <span>用户名</span>
    <input v-model="openInfo.user" type="text">

    <span>信息</span>
    <input v-model="message" type="text">
    <button @click="sendText">点击发送</button>
    <button @click="closeWeb">关闭服务</button>
  </div>
</template>

<script>
export default {
  name: "Wechat",
  data() {
    return {
      socket: null,
      message: "",
      messageLists: [],
      name: "",
      openInfo: {
        type: "info",
        message: "连接成功",
        user: name
      },
      closeInfo: {
        type: "left",
        message: "退出成功",
        user: name
      },
      sendInfo: {
        type: "message",
        text: "",
        user: name
      },

    };
  },
  mounted() {
    const name = Math.round(Math.random() * 100);
    this.openInfo.user = name;
    this.closeInfo.user = name;
    this.sendInfo.user = name;
    this.WebSocketTest();
  },
  methods: {
    closeWeb() {
      this.socket.send(JSON.stringify(this.closeInfo));
      this.socket.close();
    },
    start() {
      this.WebSocketTest();
    },
    WebSocketTest() {
      // 打开一个 web socket
      this.socket = new WebSocket("ws://192.168.3.21:3000");

      this.socket.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        this.socket.send(JSON.stringify(
          this.openInfo
        ));
      };

      this.socket.onmessage = (evt) => {
        const received = evt.data;
        console.log(`收到服务器的信息: ${received}`);
        const data = JSON.parse(received);
        switch (data.type) {
          case "message":
            console.log("走了之金额");
            this.messageLists.push(data);
            break;
        }
      };

      this.socket.onclose = () => {
        this.socket.send("客户端关闭");
        console.log(("连接已关闭..."));
      };
    },
    sendText() {
      this.sendInfo.text = this.message;
      this.socket.send(JSON.stringify(this.sendInfo));
    }
  }
};
</script>

<style scoped>

</style>
