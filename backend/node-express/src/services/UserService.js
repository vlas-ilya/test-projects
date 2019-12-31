export default class UserService {
  constructor(userDatastore) {
    this.db = userDatastore;
  }

  create(user) {
    return new Promise(async (resolve, reject) => {
      const persisted = await this.find(user.id);
      if (persisted) {
        reject('Пользователь с таким логином уже существует');
      }
      this.db.insert(user, function(error, user) {
        if (error) {
          reject(error);
        }
        resolve(user);
      });
    });
  }

  find(login) {
    return new Promise((resolve, reject) => {
      this.db.find({ login }, (error, docs) => {
        if (error) {
          reject(error);
        }
        if (docs.length > 1) {
          reject('Найдено больше одного пользователя О.о');
        }
        resolve(docs[0]);
      });
    });
  }
}
