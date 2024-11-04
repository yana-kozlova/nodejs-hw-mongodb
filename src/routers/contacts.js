import {Router} from 'express';
import * as movieControllers from '../controllers/contact.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(movieControllers.getContactsController));

contactsRouter.get('/:id', ctrlWrapper(movieControllers.getContactByIdController));

contactsRouter.post('/', ctrlWrapper(movieControllers.addContactController));

contactsRouter.patch('/:id', ctrlWrapper(movieControllers.patchContactController));

contactsRouter.delete('/:id', ctrlWrapper(movieControllers.deleteContactController));

export default contactsRouter;