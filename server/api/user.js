import mongoose from 'mongoose';
import logger from '../logger';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});
  
const UserModel = mongoose.model('User', UserSchema);

export function createUser(req, res) {
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
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(newUser));
    });
  });
}