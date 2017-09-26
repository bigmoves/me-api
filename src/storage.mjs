import mongo from 'mongodb';
const { MongoClient } = mongo;

class Storage {
  constructor() {
    this.db = null;
  }

  connect(mongoHost) {
    return MongoClient.connect(mongoHost)
      .then(db => {
        this.db = db;
        console.log('connected to mongo');
      })
      .catch(err => {
        console.log(err);
        console.log('problem connecting to mongo');
      });
  }

  close() {
    return this.db.close();
  }
}

export default new Storage();
