import express from 'express';
import controllers from './controllers';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Send email
router.post('/contact/sendEmail', controllers.contact.sendEmail);

// Collections
router.get('/collections', controllers.collections.all);
router.get('/collections/:id', controllers.collections.get);
router.post('/collections', controllers.collections.create);
router.put('/collections/:id', controllers.collections.update);
router.delete('/collections/:id', controllers.collections.destroy);

// Photos
router.get('/photos', controllers.photos.all);
router.get('/photos/:id', controllers.photos.get);
router.post('/photos', controllers.photos.create);
router.put('/photos/:id', controllers.photos.update);
router.delete('/photos/:id', controllers.photos.destroy);
router.post('/photos/upload', upload.single('file'), controllers.photos.upload);

export default router;
