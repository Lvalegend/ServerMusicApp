const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;
// Định nghĩa schema cho Song
const CommentSchema = new Schema({
    songId: {
        type: String,
        ref: "Song"
    },
    userAccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    content:{
        type: String,
    },
    date:{
        type: Date
    }
   
}, {
    collection: 'Comment',
});


const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;





