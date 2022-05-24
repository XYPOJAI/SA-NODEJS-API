"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const Joi = require("joi");
exports.profileSchema = Joi.object({
    id: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string(),
    department: Joi.string().min(8).max(10),
    address: Joi.object({
        street: Joi.string().alphanum().required(),
        city: Joi.string().alphanum().required(),
        state: Joi.string().alphanum().required(),
        ZIP: Joi.string().alphanum(),
        country: Joi.string().alphanum().required(),
    }),
    created: Joi.any(),
    updated: Joi.any(),
});
//# sourceMappingURL=validate.js.map