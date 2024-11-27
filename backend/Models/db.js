const mongoose = require('mongoose');

const mongo_url = "mongodb+srv://adnankhan958975:admin@cluster0.om5h7.mongodb.net/";

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...')
    }).catch((err) => {
        console.log('Error while MongoDB connecting ...', err);
    })