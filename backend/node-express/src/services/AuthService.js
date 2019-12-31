import { Strategy } from 'passport-local';
import passport from 'passport';

export default class AuthService {
  constructor(app, userService) {
    passport.use(
      new Strategy(
        {
          usernameField: 'login',
          passwordField: 'password',
        },
        async (login, password, done) => {
          try {
            let user = await userService.find(login);
            if (!user) {
              user = await userService.create({ login, password });
            }
            if (!user || password !== user.password) {
              return done(null, false, { message: 'Некоректный логин или пароль' });
            }
            return done(null, user);
          } catch (error) {
            return done(error);
          }
        },
      ),
    );

    passport.serializeUser((user, done) => {
      done(null, user.login);
    });

    passport.deserializeUser(async (login, done) => {
      try {
        const user = userService.find(login);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.post(
      '/api/login',
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
      }),
    );

    this.passport = passport;
  }

  isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({});
    }
    next();
  }
}
