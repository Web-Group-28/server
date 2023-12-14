const languagesRouter = require('./api/languages');
const authRouter = require('./api/user');
const courseRouter = require('./api/courses');
const userRouter = require('./api/profile');
const leaderBoardRouter = require('./api/leaderboard');

function route(app) {
    app.use('/api/languages/', languagesRouter);
    app.use('/api/courses/', courseRouter);
    app.use('/api/profile', userRouter);
    app.use('/api/leaderboard', leaderBoardRouter);
    app.use('/api', authRouter);
}

module.exports = route;