const mongoose = require('mongoose');
const config = require('../../config');
const ContentCommentModel = require('./content_comment');
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    songId: {
        type: String,
        ref: "Song"
    },
    commentInfo: {
        type: [ContentCommentModel.schema]
    }

}, {
    collection: 'Comment',
});

const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;




