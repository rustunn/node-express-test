import { check, validationResult } from 'express-validator/check';
import UserModel from '../../../models/user.js';
import logger from '../../../logger.js';


/**
 * Request body validations
 */
export const createUserValidations = [
  check('email').isEmail(),
];


/**
 * Request handler
 * @param {*} req 
 * @param {*} res 
 */
export function createUser(req, res) {
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

  UserModel.findOne({ email: req.body.email }, { lean: true }, (err, existingUser) => {
    if (err) {
      logger.error('Unable to find user by email.', err);
      res.sendStatus(500);
      return;
    }
    
    if (existingUser) {
      logger.info('Can not create new user with this email. It is already used', req.body.email);
      res.sendStatus(409);
      return;
    }

    user.save((err, newUser) => {
      if (err) {
        logger.error('Unable to create new user.', err);
        res.sendStatus(500);
        return;
      }
      logger.info('New User sucessfully created.');

      // Cleaning mongoose data object to only return public user schema feild 
      const newUserCleared = {};
      if (newUser._doc) {
        Object.keys(newUser._doc).forEach(key => {
          if (key !== 'password' && key !== '_id' && key !== '__v') newUserCleared[key] = newUser[key];
        });
      }
      res.status(200);
      res.json(newUserCleared);
    });
  });
}
