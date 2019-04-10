import routes from './routes';
import cors from 'cors';
import path from 'path';

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build'));
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/api/', routes);

app.use('/', express.static('build'));
app.use('*', express.static('build'));

  
 const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is up and running on port:', ${port}`);
});