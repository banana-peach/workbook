// 聊天室服务器端

// 导入WebSocket模块:
const WebSocket = require("ws");

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const server = new WebSocketServer({
  port: 3000
});

let clientList = [];

// Broadcast to all.
server.broadcast = (data) => {
  console.log("执行了broadcast");
  server.clients.forEach((client) => {
    client.send(JSON.stringify(
      data
    ));
  });
};

server.on("connection", function(ws) {
  console.log(`[SERVER] 服务器与客户端连接成功`);
  ws.on("message", function(message) {
    console.log(message);
    const data = JSON.parse(message);
    ws.send("123");
    switch (data.type) {
      case "login":
        clientList.push(data.user);
        clientList = Array.from(new Set([...clientList]));
        console.log(clientList);
        server.broadcast(
          {
            type: "login",
            message: "用户组",
            users: clientList
          }
        );
        break;
      case "left":
        const user = clientList.splice(clientList.indexOf(data.user), 1);
        server.broadcast(
          {
            type: "left",
            message: "用户组",
            user: user[0],
            users: clientList
          }
        );
        break;
      case "message":
        server.broadcast(
          {
            type: "message",
            message: "群聊消息",
            text: data.text,
            user: data.user
          }
        );
        break;

    }
    // server.broadcast(data);
    // console.log(`[SERVER] Received: ${message}`);
  });

});
