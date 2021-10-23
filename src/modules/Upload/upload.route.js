import { Router } from 'express';
import upload from '../../config/multer.config';
import uploadController from './upload.controller';

const UploadRouter = Router();

UploadRouter.route('/').post(upload.single('image'), uploadController.upload);

export default UploadRouter;
