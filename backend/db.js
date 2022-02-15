const mongoose = require('mongoose');
const mongo_uri = "mongodb+srv://Mansoor:crazyboy99@cluster0.yhuya.mongodb.net/inotebook?retryWrites=true&w=majority"

const connect_to_mongo = () => {
    mongoose.connect(mongo_uri, { useNewURLParser: true, useUnifiedTopology: true }, 6000000)

        .then(console.log("connected to server")).catch((err) => console.log(err));
}

module.exports = connect_to_mongo;