const db = require('./config/db');
const route = require('./routes');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser =require("cookie-parser");
const csrf = require("csurf");
const BaseResponse = require("./utils/baseResponse");

const app = express();
const { default: axios } = require('axios');
const session = require('express-session');
db.connect();

const csrfProtection = csrf({ cookie: true });

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

const port = process.env.PORT || 8080

app.set('port', port);

route(app);

// app.get('/', (req, res) => {
//   res.send(BaseResponse.ofSucceed(null));
// });

app.get('/api/user/progress/:userID/:courseID', require('./routes/api/progress'));

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.listen(app.get('port'), () => {
  console.log(`Node app is running on port ${app.get('port')}`);
});