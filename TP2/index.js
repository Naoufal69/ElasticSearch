require("dotenv").config();
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const XLSX = require("xlsx");
const fs = require("fs");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: process.env.ELASTIC_USER_PWD,
  },
  tls: {
    ca: fs.readFileSync("./cert.crt"),
    rejectUnauthorized: false,
  },
});

app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());

app.post("/delete", (req, res) => {
  const { id } = req.body;
  client
    .delete({
      index: "titles",
      id: id,
    })
    .then((resp) => {
      res.send("Delete done");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression");
    });
});

app.post("/update", (req, res) => {
  const { id, title, director, year } = req.body;
  client
    .update({
      index: "titles",
      id: id,
      body: {
        doc: {
          title: title,
          director: director,
          year: year,
        },
      },
    })
    .then((resp) => {
      res.send("Update done");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur lors de la mise à jour");
    });
});

app.get("/getAllTitles", (req, res) => {
  client
    .search({
      index: "titles",
      body: {
        query: {
          match_all: {},
        },
        size: 10000,
      },
    })
    .then(function (resp) {
      var hits = resp.hits.hits;
      res.send(hits);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur lors de la recherche");
    });
});

app.post("/submitFile", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  } else {
    const file = req.files.file;
    var body = [];
    file.mv(`${__dirname}/public/uploads/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
      } else {
        const workbook = XLSX.readFile(
          `${__dirname}/public/uploads/${file.name}`
        );
        const sheet_name_list = workbook.SheetNames;
        const data = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]]
        );
        data.forEach((element) => {
          const { Nom, Année, Réalisateur } = element;
          body.push({ index: { _index: "titles" } });
          body.push({
            title: Nom,
            director: Réalisateur,
            year: Année,
          });
        });
        fs.unlink(`${__dirname}/public/uploads/${file.name}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
        const bulkResponse = await client.bulk({ refresh: true, body });
        if (bulkResponse.errors) {
          res.status(500).send("Erreur lors de l'importation");
        } else {
          console.log(bulkResponse);
          res.send("Importation réussie");
        }
      }
    });
  }
});

app.post("/submit", (req, res) => {
  const { title, director, year } = req.body;
  IndexValues(title, director, year).catch(console.log);
  res.send("Upload done");
});

app.post("/search", (req, res) => {
  const { search } = req.body;
  client
    .search({
      index: "titles",
      body: {
        query: {
          multi_match: {
            query: search,
            type: "phrase_prefix",
            fields: ["title", "director", "year"],
          },
          size: 10000,
        },
      },
    })
    .then(function (resp) {
      var hits = resp.hits.hits;
      res.send(hits);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur lors de la recherche");
    });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

async function IndexValues(title, director, year) {
  const y = year;
  const t = title;
  const d = director;
  const { response } = await client.index({
    index: "titles",
    body: {
      title: t,
      director: d,
      year: y,
    },
  });
}
