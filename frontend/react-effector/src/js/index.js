(async () => {
  try {
    const response = await fetch('/api/getAstronomyPictureOfTheDay');
    const astronomyPictureOfTheDay = await response.json();
    console.log(astronomyPictureOfTheDay);

    const image = document.createElement('img');
    image.src = astronomyPictureOfTheDay;
    document.getElementById('content').appendChild(image);
  } catch (e) {
    console.log(e);
  }
})();