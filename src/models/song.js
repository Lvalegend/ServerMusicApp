const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;
// Định nghĩa schema cho Song
const SongSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    nameSong: {
        type: String
    },
    imageLink: {
        type: String
    },
    songLink: {
        type: String
    },
    diration: {
        type: String
    },
    singerId: {
        type: String,
        ref: "Singer"
    },
    managerId: {
        type: String,
        ref: "Manager"
    }
}, {
    collection: 'Song',
});


const SongModel = mongoose.model('Song', SongSchema);
module.exports = SongModel;





