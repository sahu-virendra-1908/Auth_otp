const express = require('express');
const dotenv = require('dotenv');
const authrouter = require('./routes/Authroutes'); // Fixed import
const { connect } = require('./connect');

dotenv.config();

const app = express();
app.use(express.json());

// Use the auth routes
app.use('/api', authrouter);

connect();

const port = 3000;
app.listen(port, () => {
    console.log('Server is started at port:', port);
});
