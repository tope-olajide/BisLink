import routes from './routes/users';

const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  res.status(201).json({
    title: 'BisLink',
    message: 'Welcome to bisLink Homepage!'
  });
});
app.use('/', routes);
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
  
let port = 3000;
app.listen(port, () => {
  console.log(`Server is up and running on port number ${port}`);
});