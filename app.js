import express, { json, urlencoded } from 'express';
import session, { Cookie } from 'express-session';
import pkg from 'passport';
const { authenticate } = pkg;
const { session: _session } = pkg;
const pgSession = connectPgSimple(session);

import pool from './db/pool.js';
import passport from 'passport';
import './config/passport.js';

import connectPgSimple from 'connect-pg-simple';

import crypto from 'crypto';
import routes from './routes/index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(passport.initialize());
app.use(passport.session());
// app.use(_session());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
    }),
    secret: process.env.SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
    // Insert express-session options here
  })
);

app.use(routes);

app.listen(3000);
