
const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const SingerSchema = new Schema({
    _id: {
        type: String,
        required: true,
        auto: false  
    },
    nameSinger: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    national:{
        type: String
    },
    songId: { 
        type: String, 
        ref: "Song"
    }
}, {
    collection: 'Singer',
});
const SingerModel = mongoose.model('Singer', SingerSchema);
module.exports = SingerModel
