import {Router} from 'express';
import * as contactControllers from '../controllers/contact.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import { upload } from '../utils/upload.js';
import validateBody from '../utils/validateBody.js';

import { contactAddSchema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactControllers.getContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(contactControllers.getContactByIdController));

contactsRouter.post('/', upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactControllers.addContactController));

contactsRouter.patch('/:id', isValidId, upload.single('photo'), validateBody(contactAddSchema), ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete('/:id', isValidId, ctrlWrapper(contactControllers.deleteContactController));

export default contactsRouter;