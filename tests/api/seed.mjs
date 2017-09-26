import storage from '../../src/storage';

// Collections
function resetCollections() {
  return storage.db.collection('collections').removeMany();
}
function seedCollections() {
  return storage.db
    .collection('collections')
    .insertOne({
      _id: '1',
      name: 'Test collection'
    })
    .then(() => {
      console.log('seeded collections');
    });
}

// Photos
function resetPhotos() {
  return storage.db.collection('photos').removeMany();
}
function seedPhotos() {
  return storage.db
    .collection('photos')
    .insertOne({
      _id: '1',
      path: 'http://digitalpolyphony.webs.com/waynes-world_l.jpg',
      collection: '1'
    })
    .then(() => {
      console.log('seeded photos');
    });
}

export default function seed() {
  return storage.connect('mongodb://mongo:27017/test').then(() => {
    return Promise.all([resetCollections(), resetPhotos()]).then(() => {
      return Promise.all([seedCollections(), seedPhotos()]);
    });
  });
}
