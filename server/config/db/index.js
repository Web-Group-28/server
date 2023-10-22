const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/duolingo', {
           
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect MongoDB Successfully!!');
    } catch (error) {
        console.log('Connect MongoDB failure: ' + error.message);
    }
}

module.exports = { connect };