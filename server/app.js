import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.status(201).json({
    title: 'BizLink',
    message: 'Welcome to bizLink Homepage!'
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


app.listen(port, () => {
    console.log('We are live at Port 3000');
  });

export default app;
