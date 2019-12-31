const express = require('express');
const path = require('path');
const config = require('../../config');

const app = express();

const paths = {
  BUILD: path.join(__dirname, 'build'),
  INDEX: path.join(__dirname, 'build', 'index.html'),
  LOGIN: path.join(__dirname, 'build', 'login.html'),
};

app.use(express.static(paths.BUILD));
app.get('/login', (req, res) => res.sendFile(paths.LOGIN));
app.get('*', (req, res) => res.sendFile(paths.INDEX));

app.listen(config.frontend.port);

console.log(`react-effector frontend is listening on port ${config.frontend.port}`);