const express = require('express');
const config = require('../../config');
const apiKey = require('../../production.config').nasaApiKey;
const NasaService = require('./src/NasaService');

const app = express();
const service = new NasaService(apiKey);


app.get('/api/getAstronomyPictureOfTheDay', async (req, res) => {
  const astronomyPictureOfTheDayUrl = await service.getAstronomyPictureOfTheDay();
  await res.json(astronomyPictureOfTheDayUrl);
});

app.listen(config.backend.port);

console.log(`node-express backend is listening on port ${config.backend.port}`);