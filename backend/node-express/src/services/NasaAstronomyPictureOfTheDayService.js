import fetch from 'node-fetch';
import format from 'date-format';

export default class NasaAstronomyPictureOfTheDayService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoints = {
      // Astronomy Picture of the Day
      APOD: 'https://api.nasa.gov/planetary/apod',
    };
  }

  async getPicture(date = new Date()) {
    const formatDate = format('yyyy-MM-dd', date);
    const url = `${this.endpoints.APOD}?api_key=${this.apiKey}&date=${formatDate}`;

    const response = await fetch(url);
    const astronomyPictureOfTheDay = await response.json();

    if ('hdurl' in astronomyPictureOfTheDay || 'url' in astronomyPictureOfTheDay) {
      return astronomyPictureOfTheDay;
    }

    throw Error('Неудалось загрузить изображение');
  }
}
