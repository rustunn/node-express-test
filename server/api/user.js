import mongoose from 'mongoose';
const { check, validationResult } = require('express-validator/check');
import logger from '../logger';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});
  
const UserModel = mongoose.model('User', UserSchema);

export const createUserValidations = [
  check('email').isEmail(),
];

export function createUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.info('Create user data validation failed', errors.array());
    res.status(422);
    res.send(JSON.stringify(errors.array()));
    return;
  }

  const user = new UserModel({
    email: req.body.email,
    password: req.body.password,
  });

  UserModel.findOne({ email: req.body.email }, { lean: true }, (err, existingUser) => {
    if (err) {
      logger.error('Unable to find user by email.', err);
      res.status(500);
      res.send();
      return;
    }
    
    if (existingUser) {
      res.status(409);
      res.send();
      return;
    }

    user.save((err, newUser) => {
      if (err) {
        logger.error('Unable to create new user.', err);
        res.status(500);
        res.send();
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
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newUserCleared));
    });
  });
}
