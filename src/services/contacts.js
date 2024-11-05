import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);

export const patchContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
    includeResultMetadata: true
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
  };
}

export const deleteContact = async (id) => {
  const result = await ContactCollection.findOneAndDelete({
    _id: id,
  });

  return result;
};