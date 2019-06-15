const fs = require('fs');

const express = require('express');
const cors = require('cors');

const app = express();

const _500 = 500;
const _200 = 200;
const _404 = 404;
const _port = 8081;
app.use(cors());
app.use(express.static(__dirname));
app.options('*', cors());

app.get('/api/podcasts', (req, res) => {
  fs.readFile(`${__dirname}/mock-data/podcasts.json`, 'utf8', (err, data) => {
    const { page = 1, pageSize = 10 } = req.query;

    // Error handling - return an error
    if (err) {
      res.status(_500).end();
      return console.error(err);
    }
    let podcasts = JSON.parse(data);
    const pagedPodcasts = podcasts.slice((page - 1) * pageSize, page * pageSize - 1)

    res.status(_200).send({
      data: { rows: pagedPodcasts, count: podcasts.length }
    });
  });
});

app.get('/api/podcasts/:podcastGuid', (req, res) => {
  fs.readFile(`${__dirname}/mock-data/podcasts.json`, 'utf8', (err, data) => {
    const { podcastGuid } = req.params;

    // Error handling - return an error
    if (err) {
      res.status(_500).end();
      return console.error(err);
    }
    let podcasts = JSON.parse(data);
    const podcast = podcasts.find(item => item.podcast_guid === podcastGuid);
    if (!podcast) {
      return res.status(_404).send({ message: "Not found" });
    }

    res.status(_200).send({
      data: podcast
    });
  });
});

app.put('/api/podcasts/:podcastGuid', (req, res) => {
  fs.readFile(`${__dirname}/mock-data/podcasts.json`, 'utf8', (err, data) => {
    const { podcastGuid } = req.params;

    // Error handling - return an error
    if (err) {
      res.status(_500).end();
      return console.error(err);
    }
    let podcasts = JSON.parse(data);
    const podcast = podcasts.find(item => item.podcast_guid === podcastGuid);
    if (!podcast) {
      return res.status(_404).send({ message: "Not found" });
    }

    res.status(_200).send({
      data: podcast
    });
  });
});

// start the app
app.listen(_port, () => {
  console.log(`App listening on port: ${_port}`);
});
