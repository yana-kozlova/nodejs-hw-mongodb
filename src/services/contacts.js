import { SORT_ORDER } from '../constants/contacts.js';
import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
                                    page = 1,
                                    perPage = 10,
                                    sortOrder = SORT_ORDER.ASC,
                                    sortBy = '_id',
                                    isFavourite,
                                    filter
                                  }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactCollection.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  if (isFavourite !== undefined) {
    contactsQuery = contactsQuery.where('isFavourite').eq(isFavourite);
  }

  contactsQuery.where('userId').equals(filter.userId);

  const contacts = await contactsQuery.exec();

  const totalContacts = await ContactCollection.countDocuments({
    userId: filter.userId, ...(isFavourite !== undefined && { isFavourite })
  });

  const paginationData = calculatePaginationData(totalContacts, perPage, page);

  return {
    data: contacts, ...paginationData,
  };
};

export const getContactById = (_id, userId) => ContactCollection.findOne({ _id, userId });

export const addContact = payload => ContactCollection.create(payload);

export const patchContact = async ({ _id, userId, payload, options = {} }) => {
  const existingContact = await ContactCollection.findOne({ _id });

  if (!existingContact) {
    throw new Error('Contact not found');
  }

  const rawResult = await ContactCollection.findOneAndUpdate({ _id, userId }, payload, {
    ...options, new: true, includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
  };
};

export const deleteContact = async (id, userId) => await ContactCollection.findOneAndDelete({
  _id: id, userId
});