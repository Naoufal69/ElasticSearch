require("dotenv").config();
const express = require("express");
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

async function IndexValues() {
  const { response } = await client.create({
    index: "titles",
    id: "11",
    body: {
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: "1972",
    },
  });
}

IndexValues().catch(console.log);
