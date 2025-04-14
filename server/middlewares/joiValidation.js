import Joi from 'joi';
import { CustomError } from '../utils/errorHandler.js';

// Function to validate request body with Joi schema
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        new CustomError(`Validation Error: ${error.details[0].message}`, 400)
      );
    }
    next();
  };
};

// Joi schema for register validation
export const signUpSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  image: Joi.string().min(10).max(120).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

// Joi schema for update user validation
export const updateUserSchema = Joi.object({
    first_name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().min(2).max(50).optional(),
    image: Joi.string().min(10).max(120).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(100).optional(),
  });

// Joi schema for login validation
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

// Joi schema for creating a score
export const createScore = Joi.object({
  score: Joi.number().integer().required()
});

// Export the validation middleware
export const validateSignUp = validate(signUpSchema);
export const validateLogin = validate(loginSchema);
export const validateUpdateUser = validate(updateUserSchema);
export const validateScore = validate(createScore);