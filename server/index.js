const db = require('./config/db');
const route = require('./routes');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/auth')

const app = express();
const { default: axios } = require('axios');
const session = require('express-session');
db.connect();

app.use(bodyParser.json());
app.use(cors());

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

app.get('/api/user/profile', require('./routes/api/profile'));
app.get('/api/languages', require('./routes/api/languages'));//OK
app.get('/api/courses', require('./routes/api/courses'));//OK
app.get('/api/courses/:courseId/lessons', require('./routes/api/lessons'));//OK
app.get('/api/courses/:courseId/lessons/:lessonId', require('./routes/api/lesson'));//OK
app.get('/api/user/progress', require('./routes/api/progress'));
app.get('/api/courses/:courseId/lessons/:lessonId/exercises', require('./routes/api/exercises'));//?
app.get('/api/courses/:courseId/lessons/:lessonId/exercises/:exerciseId', require('./routes/api/exercise'));//?
app.post('/api/courses/:courseId/lessons/:lessonId/submit', require('./routes/api/submit'));//OK
app.get('/api/leaderboard', require('./routes/api/leaderboard'));
app.get('/api/user/friends', require('./routes/api/friends'));

app.listen(app.get('port'), () => {
  console.log(`Node app is running on port ${app.get('port')}`);
});