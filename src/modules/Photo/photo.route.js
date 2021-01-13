import { Router } from 'express';
import checkToken from '../../middlewares/token.middleware';
import photoController from './photo.controller';

const PhotoRouter = Router();
PhotoRouter.route('/').get(photoController.getAll).post(checkToken, photoController.createPhoto);
PhotoRouter.route('/:photoId')
  .get(photoController.getById)
  .put(checkToken, photoController.updatePhoto)
  .delete(checkToken, photoController.deletePhoto);
PhotoRouter.route('/users/me').get(checkToken, photoController.getAllOfCurrentUser);
export default PhotoRouter;
