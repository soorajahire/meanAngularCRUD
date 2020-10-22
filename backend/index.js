
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./src/route/userRoute');
const mongoose = require('mongoose');


const mongoDBUri = "mongodb+srv://arkenea:arkenea@cluster0.4srwi.mongodb.net/user?retryWrites=true&w=majority"
mongoose.connect(mongoDBUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('db conneted');
}).catch((err) => {
    console.log(err);
});
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

