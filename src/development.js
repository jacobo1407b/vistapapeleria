const express = require("express");
const path = require("path");
//inicializacion
const app = express();
console.log("starting development server ...");
//setting
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
//middlewares

const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");
const compile = webpack(webpackConfig);
app.use(webpackDevMiddleware(compile));

app.use(express.json());

//archivos estaticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "PDF")));

//server start
app.listen(app.get("port"), () => {
  console.log("listen on port", app.get("port"));
  console.log(`open browser on http://localhost:${app.get("port")}`);
});
