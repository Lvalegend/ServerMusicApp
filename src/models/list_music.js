const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;
// Định nghĩa schema cho Song
const MusicListSchema = new Schema({
    nameMusicList: {
        type: String
    },
    description: {
        type: String
    },
    imageLink: {
        type: String
    },
    userAccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
}, {
    collection: 'MusicList',
});


const MusicListModel = mongoose.model('MusicList', MusicListSchema);
module.exports = MusicListModel;





