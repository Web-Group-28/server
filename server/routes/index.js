const authRouter = require('./api/user');

function route(app) {
    
    app.use('/api', authRouter);
}

module.exports = route;