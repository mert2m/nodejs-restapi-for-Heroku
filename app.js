const app = require("express")();
const db = require("./db.json");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  console.log("Request...");
  res.status(200).send(db);
});

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  if (isNaN(req.params.id)) {
    res.status(400).send({ message: "İşlenemeyen veri" });
  } else {
    const user = db.find((u) => u.id == req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "Kullanıcı bulunamadı" });
    }
  }
});

app.post("/users", (req, res) => {
  const willSaveData = {
    id: new Date().getTime(),
    full_name: req.body.full_name,
    country: req.body.country,
    email: req.body.email,
    created_at: new Date(),
  };

  db.push(willSaveData);
  res.status(200).send(willSaveData);
});

app.patch("/users/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send({ message: "İşlenemeyen veri" });
  } else {
    const user = db.find((u) => u.id == req.params.id);
    if (user) {
      Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];
      });
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "Kullanıcı bulunamadı" });
    }
  }
});

app.delete("/users/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(400).send({ message: "İşlenemeyen veri" });
  } else {
    const userIndex = db.findIndex((u) => u.id == req.params.id);
    if (userIndex > -1) {
      db.splice(userIndex, 1);
      res.status(201).send({ message: "Kullanıcı silindi" });
    } else {
      res.status(404).send({ message: "Kullanıcı bulunamadı" });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ayaktadır.. Çalışıyor.. Port: ${port}`);
});
