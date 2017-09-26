import storage from '../storage';
import Promise from 'bluebird';
import mongodb from 'mongodb';
const { ObjectId } = mongodb;

const safeObjectId = s => (ObjectId.isValid(s) ? new ObjectId(s) : null);

function populatePhotos(collectionId) {
  return storage.db
    .collection('photos')
    .find({ collection: String(collectionId) })
    .toArray();
}

export function all(req, res) {
  storage.db
    .collection('collections')
    .find()
    .toArray()
    .then(docs => {
      return Promise.map(docs, doc => {
        return populatePhotos(doc._id).then(photos => {
          doc.photos = photos;
          return doc;
        });
      });
    })
    .then(docs => {
      res.json(docs);
    })
    .catch(() => {
      res.sendStatus(404);
    });
}

export function get(req, res) {
  const id = req.params.id;

  storage.db
    .collection('collections')
    .findOne({ _id: safeObjectId(id) })
    .then(doc => {
      return populatePhotos(doc._id).then(photos => {
        doc.photos = photos;
        res.json(doc);
      });
    })
    .catch(() => {
      res.sendStatus(404);
    });
}

export function create(req, res) {
  storage.db
    .collection('collections')
    .findOneAndUpdate(
      { name: req.body.name },
      { $set: req.body },
      { upsert: true, returnOriginal: false }
    )
    .then(r => {
      res.status(201).json(r.value);
    })
    .catch(() => {
      res.sendStatus(422);
    });
}

export function update(req, res) {
  const id = req.params.id;

  storage.db
    .collection('collections')
    .findOneAndUpdate({ _id: id }, { $set: req.body }, { returnOriginal: false })
    .then(r => {
      res.json(r.value);
    })
    .catch(() => {
      res.sendStatus(422);
    });
}

export function destroy(req, res) {
  const id = req.params.id;

  storage.db
    .collection('collections')
    .deleteOne({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(422);
    });
}
