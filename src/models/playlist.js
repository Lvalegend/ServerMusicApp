
const mongoose = require('mongoose');
const config = require('../../config');
const Schema = mongoose.Schema;
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);

const PlaylistSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,

    },
    image: {
        type: String,
    },
    songs: [{
        type: String,
        ref: 'Song'
    }]
}, {
    collection: 'Playlist',
});
const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);
module.exports = PlaylistModel
