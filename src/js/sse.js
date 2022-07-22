"use strict";

/**
 * Module dependencies.
 */

var express = require("express");

var app = module.exports = express();

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect respects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];
  // key isn't present
  if (!key) return next(error(400, "api key required"));
  // key is invalid
  if (apiKeys.indexOf(key) === -1) return next(error(401, "invalid api key"));

  // all good, store req.key for route access
  req.key = key;
  next();
});

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

var apiKeys = ["foo", "bar", "baz"];

// these two objects will serve as our faux database

var repos = [
  {
    name: "express",
    url: "https://github.com/expressjs/express"
  },
  {
    name: "stylus",
    url: "https://github.com/learnboost/stylus"
  },
  {
    name: "cluster",
    url: "https://github.com/learnboost/cluster"
  }
];

var users = [{ name: "tobi" }, { name: "loki" }, { name: "jane" }];

var userRepos = {
  tobi: [repos[0], repos[1]],
  loki: [repos[1]],
  jane: [repos[2]]
};

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
    res.write("event: 222\n" + "data: " + JSON.stringify({num: counter}) + "\n\n");
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

// example: http://localhost:3600/api/repos/?api-key=foo
app.get("/api/repos", function (req, res, next) {
  res.send(repos);
});

// example: http://localhost:3600/api/user/tobi/repos/?api-key=foo
app.get("/api/user/:name/repos", function (req, res, next) {
  var name = req.params.name;
  var user = userRepos[name];

  if (user) {
    res.send(user);
  } else {
    next();
  }
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
