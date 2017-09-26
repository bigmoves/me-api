import storage from '../storage';
import { uploadFile } from '../utils/digital-ocean';
import sizeOf from 'image-size';

export function all(req, res) {
  storage.db
    .collection('photos')
    .find()
    .toArray()
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
    .collection('photos')
    .findOne({ _id: id })
    .then(doc => {
      res.json(doc);
    })
    .catch(() => {
      res.sendStatus(404);
    });
}

export function upload(req, res) {
  let location;

  uploadFile(req.file)
    .then(fileLocation => {
      location = fileLocation;
      return sizeOf(req.file.path);
    })
    .then(({ width, height }) => {
      res.json({
        location,
        width,
        height
      });
    })
    .catch(err => {
      console.log(err, 'Error uploading photo to digital ocean');
      res.sendStatus(500);
    });
}

export function create(req, res) {
  storage.db
    .collection('photos')
    .findOneAndUpdate(
      {
        collection: req.body.collection,
        location: req.body.path
      },
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
    .collection('photos')
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
    .collection('photos')
    .deleteOne({ _id: id })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(422);
    });
}
