import { check, validationResult } from 'express-validator/check';
import UserModel from '../../../models/user.js';
import logger from '../../../utils/logger.js';
import __ from '../../../utils/localize.js';


/**
 * Request body validations
 */
export const createUserValidations = [
  check('email')
    .trim()
    .isLength({ min: 5 }).withMessage(__('error.tooShort', __('email'), 5))
    .isEmail().withMessage(__('error.invalidEmail'))
    .normalizeEmail(),
  check('password')
    .trim()
    .isLength({ min: 6 }).withMessage(__('error.tooShort', __('password'), 6))
];


/**
 * Request handler
 * @param {*} req 
 * @param {*} res 
 */
export async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.info('Create user data validation failed', errors.array());
    res.status(422);
    res.json(errors.array());
    return;
  }

  const user = new UserModel({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email }, { lean: true });
    if (existingUser) {
      logger.info('Can not create new user with this email. It is already used', req.body.email);
      res.sendStatus(409);
      return;
    }

    try {
      const newUser = await user.save();
      logger.info('New User successfully created.');

      // Cleaning mongoose data object to only return public user schema field 
      const newUserCleared = {};
      if (newUser._doc) {
        Object.keys(newUser._doc).forEach(key => {
          if (key !== 'password' && key !== '_id' && key !== '__v') newUserCleared[key] = newUser[key];
        });
      }
      res.status(200);
      res.json(newUserCleared);
    } catch (err) {
      logger.error('Unable to create new user.', err);
      res.sendStatus(500);
      return;
    }
  } catch(err) {
    logger.error('Unable to find user by email.', err);
    res.sendStatus(500);
    return;
  }
}
