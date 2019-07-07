const express = require("express");

const app = express();

// primeira parte
/*const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  );

  req.appName = "goNede";

  return next();
};
app.use(logMiddleware);
//query params
//localhost:3000/?name=lala
app.get("/", (req, res) => {
  return res.send("huuuumm " + req.query.name + "aand" + req.appName);
});

//localhost:3000/name/lala
app.get("/nome/:id", (req, res) => {
  return res.send(req.params.id);
});

app.get("/nome", (req, res) => {
  return res.json({
    message: "bem vindo hehe",
    name: req.query.name
  });
});*/

//segunda parte

const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

//informar a leitura de corpo (receber os dados atraves do req e poder realizar a leitura)
app.use(express.urlencoded({ extended: false }));
//serve para setar configurações globais
app.set("view engine", "njk"); //1º: extenção utilizda pelos arquivos 2º: njk

const users = ["matheus", "menezes", "manfrin"];

app.get("/", (req, res) => {
  return res.render("list", { name: "matheus", users });
});

app.get("/new", (req, res) => {
  return res.render("new");
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const { user } = req.body;
  users.push(user);
  return res.redirect("/");
});

app.listen(3000);
