export default class NasaController {
  constructor(app, nasaService, authService) {
    this.getAstronomyPictureOfTheDay = this.getAstronomyPictureOfTheDay.bind(this);
    this.nasaService = nasaService;
    app.get(
      '/api/getAstronomyPictureOfTheDay',
      authService.isAuthenticated,
      this.getAstronomyPictureOfTheDay,
    );
  }

  async getAstronomyPictureOfTheDay(req, res) {
    const url = await this.nasaService.getAstronomyPictureOfTheDay();
    await res.json(url);
  }
}
