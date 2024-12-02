import {Schema, model} from 'mongoose';

import { typeList } from '../../constants/contacts.js';

import { handleSaveError } from './hooks.js';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: true
  },
  contactType: {
    type: String,
    enum: typeList,
    required: true,
    default: 'personal',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  photo: { type: String },
}, {
  versionKey: false,
  timestamps: true,
});

contactSchema.post('save', handleSaveError);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;