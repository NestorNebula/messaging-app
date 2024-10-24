const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/profiles', routes.profile);
app.use('/messages', routes.message);
app.use('/chats', routes.chat);

app.listen(process.env.PORT, () =>
  console.log(`App listening on Port ${process.env.PORT}`)
);
