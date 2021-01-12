import { Router } from 'express';
import upload from '../../config/multer.config';
import uploadMiddleware from '../../middlewares/upload.middleware';
import uploadController from './upload.controller';

const UploadRouter = Router();

UploadRouter.route('/').post(upload.single('image'), uploadMiddleware, uploadController.upload);

export default UploadRouter;
