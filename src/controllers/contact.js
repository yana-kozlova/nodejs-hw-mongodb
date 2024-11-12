import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data
  })
}

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await contactServices.getContactById(id);

    if (!data) {
      throw createHttpError(404, `Contact with id ${id} not found!`);
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export const addContactController = async (req, res) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  })
}

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await contactServices.patchContact({
    _id, payload: req.body
  });

  if (!result) {
    res.status(404).json({
      status: 404,
      message: `Contact with id ${_id} not found!`,
    });
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.data,
  });
}

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  try {

    const result = await contactServices.deleteContact(id);

    if (!result) {
      throw createHttpError(404, `Contact with id ${id} not found!`);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

