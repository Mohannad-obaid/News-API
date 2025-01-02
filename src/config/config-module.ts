import * as Joi from 'joi';

export const schemaJois = Joi.object({
    PORT: Joi.number().required(),
});
