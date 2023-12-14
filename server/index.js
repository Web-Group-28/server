const db = require('./config/db');
const route = require('./routes');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser =require("cookie-parser");
const BaseResponse = require('./utils/baseResponse');

const app = express();
const { default: axios } = require('axios');
const session = require('express-session');
db.connect();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(morgan('combined'));
app.use(express.json());

app.use(session({
  secret: 'sJuVEoVwZajx8UoKyjCxXCkwQRFxvncxPJSVUsnUldiBlen8Ig',
  resave: false,
  saveUninitialized: true
}));

const port = process.env.PORT || 3000

app.set('port', port);

route(app);

app.get('/', (req, res) => {
  res.send(BaseResponse.ofSucceed(null));
});

app.get('/api/user/progress', require('./routes/api/progress'));
app.get('/api/courses/:courseId/lessons/:lessonId/exercises/:exerciseId', require('./routes/api/exercise'));//?

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Node app is running on port ${app.get('port')}`);
});