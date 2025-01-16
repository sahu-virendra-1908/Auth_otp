const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://virendra:alwar123@cluster0.9ic6f.mongodb.net/gdsc', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error) {
        console.log('Error in connecting to database :', error);
    }
}

module.exports = { connect };