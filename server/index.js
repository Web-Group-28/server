const db = require('./config/db');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const authMiddleware = require('./middlewares/auth')

db.connect();

app.use(bodyParser.json());
app.use(cors());

app.use(morgan('combined'));
app.use(express.json());

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

app.set('port', port);

app.get('/', (req, res) => {
  res.send("API is UP");
});

app.post('/api/register', require('./routes/api/user').register);
app.post('/api/login', require('./routes/api/user').login);
app.get('/api/token', authMiddleware, require('./routes/api/user').currentUser)
app.get('/api/user/profile', require('./routes/api/profile'));
app.get('/api/languages', require('./routes/api/languages'));
app.get('/api/courses', require('./routes/api/courses'));
app.get('/api/courses/:courseId/lessons', require('./routes/api/lessons'));
app.get('/api/courses/:courseId/lessons/:lessonId', require('./routes/api/lesson'));
app.get('/api/user/progress', require('./routes/api/progress'));
app.get('/api/courses/:courseId/lessons/:lessonId/exercises', require('./routes/api/exercises'));
app.get('/api/courses/:courseId/lessons/:lessonId/exercises/:exerciseId', require('./routes/api/exercise'));
app.post('/api/courses/:courseId/lessons/:lessonId/exercises/:exerciseId/submit', require('./routes/api/submit'));
app.get('/api/leaderboard', require('./routes/api/leaderboard'));
app.get('/api/user/friends', require('./routes/api/friends'));

app.listen(app.get('port'), () => {
   console.log(`Node app is running on port ${app.get('port')}`);
});