import {Router} from 'express';
import * as movieControllers from '../controllers/contact.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(movieControllers.getContactsController));

contactsRouter.get('/:id', ctrlWrapper(movieControllers.getContactByIdController));

export default contactsRouter;