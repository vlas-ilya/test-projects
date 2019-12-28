const format = require('date-format');
const fetch = require('node-fetch');

module.exports = class NasaService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoints = {
      // Astronomy Picture of the Day
      APOD: 'https://api.nasa.gov/planetary/apod',
    };
  }

  async getAstronomyPictureOfTheDay(date = new Date()) {
    const formatDate = format('yyyy-MM-dd', date);
    const url = `${this.endpoints.APOD}?api_key=${this.apiKey}&date=${formatDate}`;

    const response = await fetch(url);
    const astronomyPictureOfTheDay = await response.json();

    if ('hdurl' in astronomyPictureOfTheDay) {
      return astronomyPictureOfTheDay.hdurl
    }

    if ('url' in astronomyPictureOfTheDay) {
      return astronomyPictureOfTheDay.url
    }

    throw Error('Неудалось загрузить изображение');
  }
}