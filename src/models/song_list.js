
const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const SongListSchema = new Schema({
    listMusicId: {
        type: Schema.Types.ObjectId,
        ref: "MusicList"
    },
    songId: {
        type: String,
        ref: "Song"
    },
}, {
    collection: 'SongList',
});

const SongListModel = mongoose.model('SongList', SongListSchema);
module.exports = SongListModel
