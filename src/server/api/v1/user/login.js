import { check } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import logger from '../../../utils/logger.js';
import { getDB } from '../../../utils/mongo.js';


/**
 * Request body validations
 */
export const loginValidations = [
  check('email')
    .trim(),
  check('password')
    .trim()
];


/**
 * Request handler
 */
export async function login(req, res) {
  const db = getDB();
  const collection = db.collection('users');

  try {
    
  } catch(err) {
    logger.error('Unable to find user by email.', err);
    res.sendStatus(500);
    return;
  }
}
