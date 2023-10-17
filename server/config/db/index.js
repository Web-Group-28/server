const mongoose = require('mongoose');

const dbHost = process.env.MONGO_HOST || '127.0.0.1'
const dbPort = process.env.MONGO_PORT || 27017
const dbName = process.env.MONGO_DB_NAME || 'team_28'
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

async function connect() {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect MongoDB Successfully!!');
    } catch (error) {
        console.log('Connect MongoDB failure: ' + error.message);
    }
}

module.exports = { connect };