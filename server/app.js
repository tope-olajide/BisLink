import routes from './routes';
import cors from 'cors'
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/', routes);
app.get('/', (req, res) => {
  res.status(201).json({
    title: 'BisLink',
    message: 'Welcome to bisLink Homepage!'
  });
});

app.get('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'invalid link'
  });
});

app.post('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'invalid link'
  });
});
  
 const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on: http://localhost:%s', ${port}`);
});