const languagesRouter = require('./api/languages');
const authRouter = require('./api/user');

function route(app) {
    app.use('/api/languages/', languagesRouter);
    app.use('/api', authRouter);
}

module.exports = route;