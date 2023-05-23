require("dotenv").config();
const express = require("express");
const app = express();
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
            fields: ["title", "director", "year"],
          },
        },
      },
    })
    .then(function(resp) {
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
