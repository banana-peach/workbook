"use strict";

var express = require("express");

var app = module.exports = express();

// we now can assume the api key is valid,
// and simply expose the data
// var router = express.Router()
app.get("/sse", async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.header("Access-Control-Allow-Origin", "http://localhost/index");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write("id: 1\n\n");
  let count = 0;

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Emit", ++count);
    // Emit an SSE that contains the current 'count' as a string
    res.write(`id:1\n,event: ${count}\n\n`);
  }
});

// 用了这个
app.get("/streaming", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // flush the headers to establish SSE with client

  let counter = 0;
  let interValID = setInterval(() => {
    counter++;
    if (counter >= 10) {
      clearInterval(interValID);
      res.end(); // terminates SSE session
      return;
    }
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`); // res.write() instead of res.send()
    res.write("event: 222\n" + "data: " + JSON.stringify({ num: counter }) + "\n\n");
  }, 1000);

  // If client closes connection, stop sending events
  res.on("close", () => {
    console.log("client dropped me");
    clearInterval(interValID);
    res.end();
  });
});

// example: http://localhost:3600/api/users/?api-key=foo
app.get("/api/users", function (req, res, next) {
  res.send(users);
});

app.use("/test", function (req, res, next) {
  res.send("ok");
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function (err, req, res, next) {
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3600);
  console.log("Express started on port 3600");
}
