
const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const CategorySongSchema = new Schema({
    songId: {
        type: String,
        ref: "Song"
    },
    categoryId: {
        type: String,
        ref: "Category"
    },
}, {
    collection: 'CategorySong',
});

const CategorySongModel = mongoose.model('CategorySong', CategorySongSchema);
module.exports = CategorySongModel
