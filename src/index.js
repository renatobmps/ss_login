import express from "express";
import session from "express-session";

const app = express();

app.set("trust proxy", 1); // trust first proxy

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

app.get("/in", (req, res) => {
  const query = req.query || {};
  console.log({ query });

  req.session.user = query;

  return res.send("salvo");
});

app.get("/out", (req, res) => {
  return res.json(req.session.user || {});
});

app.get("/logout", (req, res) => {
  req.session.user = {};

  return res.json(req.session.user || {});
});

app.listen(3000, () =>
  console.log({
    in: "http://localhost:3000/in?chave=valor&name=username",
    out: "http://localhost:3000/out",
    logout: "http://localhost:3000/logout",
  })
);
