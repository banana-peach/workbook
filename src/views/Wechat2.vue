<template>
  <div>
    <h2>测试医生端
    </h2>
    <div class="chat-container">
      <div class="chat-message">
        <div class="chat">
          <ul>
            <li v-for="(item, index) in messageLists" :key="index">
              发送人 {{ item.user }}, 消息<b>{{ item.text }}</b>
            </li>
          </ul>
        </div>
        <div class="chat-option">
          <span>待发送的信息</span>
          <input v-model="message" type="text">
          <button @click="sendText">点击发送</button>
        </div>
        <!--        <button @click="closeWeb">关闭服务</button>-->
      </div>
      <div class="chat-persons">
        <ul class="chat-users">
          <li v-for="(item, index) in userLists" :key="index" class="chat-user">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
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
      userLists: [],
      name: "",
      openInfo: {
        type: "login",
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


    window.addEventListener("unload", () => {
      // console.log("unload");
      this.closeWeb();
    });
  },
  methods: {
    closeWeb() {
      this.socket.send(JSON.stringify(this.closeInfo));
      this.socket.close();
    },
    WebSocketTest() {
      console.log("打开socket");
      // 打开一个 web socket
      this.socket = new WebSocket("ws://192.168.3.27:6001");
      console.log(this.socket);
      this.socket.onopen = () => {
        // Web Socket 已连接上，使用 send() 方法发送数据
        this.socket.send(JSON.stringify(
          {
            type: "left",
            part: "doctorSide", // doctorSide 医生端, nurseIndex 护士首页, nurseRegister 护士排号
          }
        ));
      };

      this.socket.onmessage = (evt) => {
        const received = evt.data;
        console.log(`收到服务器的信息: ${received}`);
        const data = JSON.parse(received);
        switch (data.type) {
          case "message":
            this.messageLists.push(data);
            break;
          case "left":
            // 有人离开了
            // console.log(data);
            this.userLists = data.users;
            // this.userLists.splice(this.userLists.indexOf(data.user), 1);
            break;
          case "login":
            this.userLists = data.users;
            // console.log(this.userLists);
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

<style scoped lang="scss">
.chat-container {
  display: flex;

}

.chat-message {
  width: 500px;
}

.chat-persons {
  cursor: pointer;
  margin-left: 20px;

  .chat-user {
    width: 100px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: #333 solid 1px;
    margin-top: 2px;
  }

  .chat-user:hover {
    border-color: aqua;
    color: black;
    font-weight: 700;
  }
}

.chat {
  height: 500px;
  overflow: auto;
  margin-left: 20px;
  padding-top: 20px;
}

.chat-option {
  padding-top: 20px;
}
</style>
