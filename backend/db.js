const mongoose = require('mongoose');
const mongo_uri = "mongodb+srv://Mansoor:<crazyboy99@>@cluster0.yhuya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connect_to_mongo = () => {
    mongoose.connect(mongo_uri, () => {
        console.log('mongoose connect successfully');
    })
}

module.exports = connect_to_mongo;