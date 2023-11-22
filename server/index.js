const db = require('./config/db');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/auth')

const app = express();
const { default: axios } = require('axios');
const cookieParser = require('cookie-parser');
const session = require('express-session');
db.connect();

app.use(bodyParser.json());
app.use(cors());

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

const port = process.env.PORT || 3000

app.set('port', port);

app.get('/', (req, res) => {
  res.send("API is UP");
});
app.get('/courses/:courseId/lessons', async (req, res) => {
  try {
    const lessonsResponse = await axios.get(`http://localhost:3000/api/courses/${req.params.courseId}/lessons`);
    const lessonsData = lessonsResponse.data;
    console.log(lessonsData)
    res.send(lessonsData)
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/register', require('./routes/api/user').register);//OK
app.post('/api/login', require('./routes/api/user').login);//OK
app.get('/api/token', authMiddleware, require('./routes/api/user').currentUser);//OK
app.get('/api/user/profile', require('./routes/api/profile'));
app.get('/api/languages', require('./routes/api/languages'));//OK
app.get('/api/courses', require('./routes/api/courses'));//OK
app.get('/api/courses/:courseId/lessons', require('./routes/api/lessons'));//OK
app.get('/api/courses/:courseId/lessons/:lessonId', require('./routes/api/lesson'));//OK
app.get('/api/user/progress', require('./routes/api/progress'));
app.get('/api/courses/:courseId/lessons/:lessonId/exercises', require('./routes/api/exercises'));//?
app.get('/api/courses/:courseId/lessons/:lessonId/exercises/:exerciseId', require('./routes/api/exercise'));//?
app.post('/api/courses/:courseId/lessons/:lessonId/submit', require('./routes/api/submit'));
app.get('/api/leaderboard', require('./routes/api/leaderboard'));
app.get('/api/user/friends', require('./routes/api/friends'));
app.get('/api/session', (req, res) => {
  res.send(req.session);
});

app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Node app is running on port ${app.get('port')}`);
});