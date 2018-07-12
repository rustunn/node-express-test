import { check, validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import logger from '../../../utils/logger.js';
import { getDB } from '../../../utils/mongo.js';
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

  const db = getDB();
  const collection = db.collection('users');

  try {
    const salt  = await bcrypt.genSalt(10);
    try {
      const hash = await bcrypt.hash(req.body.password, salt);

      const user = {
        email: req.body.email,
        password: hash,
      };
    
      try {
        const existingUser = await collection.find({ email: req.body.email }).limit(1).toArray();
        if (existingUser.length) {
          logger.info('Can not create new user with this email. It is already used', req.body.email);
          res.sendStatus(409);
          return;
        }
    
        try {
          const newUser = await collection.insertOne(user);
          logger.info('New User successfully created.');
    
          // Cleaning mongoose data object to only return public user schema field 
          const newUserCleared = {};
          if (newUser && newUser.ops && newUser.ops[0]) {
            Object.keys(newUser.ops[0]).forEach(key => {
              if (key !== 'password' && key !== '_id' && key !== '__v') newUserCleared[key] = newUser.ops[0][key];
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
    } catch(err) {
      logger.error('Unable to generate password hash.', err);
    }
  } catch(err) {
    logger.error('Unable to generate password salt.', err);
  }
}
