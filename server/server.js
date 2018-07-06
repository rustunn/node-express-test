import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

const config = dotenv.config({ path: path.join(__dirname, '../config/.env.dev') });
if (!config) console.log('%s Unable to load configuration file.', chalk.red('✗'));

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.get('/', (req, res) => {
  console.log(req);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
});

app.listen(3000, 'localhost', () => {
  console.log(chalk.green('✓ Server is running.'));
});
