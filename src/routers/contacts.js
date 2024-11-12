import {Router} from 'express';
import * as movieControllers from '../controllers/contact.js';

import { isValidId } from '../middlewares/isValidId.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import { contactAddSchema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(movieControllers.getContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(movieControllers.getContactByIdController));

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(movieControllers.addContactController));

contactsRouter.patch('/:id', isValidId, validateBody(contactAddSchema), ctrlWrapper(movieControllers.patchContactController));

contactsRouter.delete('/:id', isValidId, ctrlWrapper(movieControllers.deleteContactController));

export default contactsRouter;