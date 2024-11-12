import Joi from "joi";

import { typeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({
    "any.required": "Name is required",
    "string.min": "Name should have at least {#limit} characters",
    "string.max": "Name should have at most {#limit} characters",
    "string.empty": "Name cannot be empty"
  }),
  phoneNumber: Joi.string().pattern(/^\+380\d{9}$/).required().messages({
    "any.required": "Phone is required",
    "string.pattern.base": "Phone number must be in the format +380XXXXXXXXX",
    "string.empty": "Phone number cannot be empty"
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email address"
  }),
  isFavourite: Joi.boolean().messages({
    "boolean.base": "isFavourite should be a boolean value"
  }),
  contactType: Joi.string().valid(...typeList).required().messages({
    "any.required": "Contact type is required",
    "any.only": `Contact type must be one of the following: ${typeList.join(", ")}`
  })
});
