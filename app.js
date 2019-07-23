const express = require("express"),
  cors = require("cors"),
  queries = require("./queries/queries"),
  bodyParser = require("body-parser"),
  mustacheExpress = require("mustache-express"),
  app = express();

app
  .use(cors())
  .options("*", cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use("/public", express.static("public"))
  .use("public/script", express.static("uploads/script"))
  .engine("mustache", mustacheExpress())
  .set("view engine", "mustache")
  .set("views", "./views")
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get("/home", queries.GoHome);

app.listen(8080, () => {
  console.log("live on port 8080");
});
