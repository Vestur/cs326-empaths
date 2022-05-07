import passport from 'passport';
import passportLocal from 'passport-local';
import { CharitableDatabase } from "./database.js";

const DBURL = process.env.DBURL;
const db = new CharitableDatabase(DBURL);
await db.connect();
await db.init();

const { Strategy } = passportLocal;

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using username and
// password credentials from the client. The LocalStrategy object is used to
// authenticate a user using a username and password.
const strategy = new Strategy(async (username, password, done) => {
  const usersCursor = await db.findUsers(username);
  let users = [];
  while (await usersCursor.hasNext()) {
    users.push(await usersCursor.next());
  }
  if (users.length < 1) {
    return done(null, false, { message: 'Wrong username' });
  }
  for (const user of users) {
    if (user['password'] === password) {
      return done(null, user);
    }
  }
  await new Promise((r) => setTimeout(r, 2000)); // two second delay
  return done(null, false, { message: 'Wrong password' });
});

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a username and
// password. There are other strategies available, but this is the simplest.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};
