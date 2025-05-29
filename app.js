import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import { initialize, session as _session } from 'passport';
import crypto from 'crypto';
import routes from './routes';
import connection from './config/database';

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// Need to require the entire Passport config module so app.js knows about it
import './config/passport';

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(_session());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
