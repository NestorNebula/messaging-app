const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const Sperror = require('sperror');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/profiles', routes.profile);
app.use('/messages', routes.message);
app.use('/chats', routes.chat);

app.use((req, res, next) => {
  next(new Sperror('Not Found', "The resource couln't be found.", 404));
});

app.use((err, req, res, next) => {
  err instanceof Sperror
    ? res.json({ error: err })
    : res.json({
        error: new Sperror(
          'Server error',
          'The app faced an unexpected error.',
          500
        ),
      });
});

app.listen(process.env.PORT, () =>
  console.log(`App listening on Port ${process.env.PORT}`)
);