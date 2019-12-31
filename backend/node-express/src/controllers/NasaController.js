export default class NasaController {
  constructor(app, nasaAstronomyPictureOfTheDayService, authService) {
    this.getAstronomyPictureOfTheDay = this.getAstronomyPictureOfTheDay.bind(this);

    this.nasaAstronomyPictureOfTheDayService = nasaAstronomyPictureOfTheDayService;

    app.get(
      '/api/getAstronomyPictureOfTheDay',
      authService.isAuthenticated,
      this.getAstronomyPictureOfTheDay,
    );
  }

  async getAstronomyPictureOfTheDay(req, res) {
    const picture = await this.nasaAstronomyPictureOfTheDayService.getPicture();
    await res.json(picture);
  }
}
