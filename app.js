import express, { json, urlencoded } from 'express';
import session, { Cookie } from 'express-session';
import { Pool } from 'pg';
import passport from 'passport';
import './config/passport.js';

import connectPgSimple from 'connect-pg-simple';

import pkg from 'passport';
const { session: _session } = pkg;
import crypto from 'crypto';
import routes from './routes/index.js';

const pgSession = connectPgSimple(session);

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(passport.session());
app.use(passport.initialize());
app.use(_session());
app.use(json());
app.use(urlencoded({ extended: true }));

const pool = new Pool({
  host: '127.0.0.1',
  user: 'julianso',
  database: 'session_auth',
  password: '1234',
  port: 5432,
});

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session_auth',
    }),
    secret: process.env.SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

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
