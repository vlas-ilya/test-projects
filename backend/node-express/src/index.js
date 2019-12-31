import { nasaApiKey, sessionSecret } from '../../../production.config';

import AuthService from './services/AuthService';
import Datastore from 'nedb';
import NasaAstronomyPictureOfTheDayService from './services/NasaAstronomyPictureOfTheDayService';
import NasaController from './controllers/NasaController';
import UserService from './services/UserService';
import config from '../../../config';
import express from 'express';
import session from 'express-session';

const userDatastore = new Datastore({
  filename: './data/users.db',
  autoload: true,
});
const userService = new UserService(userDatastore);
const nasaService = new NasaAstronomyPictureOfTheDayService(nasaApiKey);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

const authenticationService = new AuthService(app, userService);
new NasaController(app, nasaService, authenticationService);

app.listen(config.backend.port);

console.log(`node-express backend is listening on port ${config.backend.port}`);
