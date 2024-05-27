const mongoose = require('mongoose');
const config = require('../../config');
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;
const ContentCommentSchema = new Schema({
    userId: {
        type: String,
    },
    content: {
        type: String
    },
    date: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const year = currentDate.getFullYear();
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');
            return `${day}/${month}/${year}/${hours}:${minutes}:${seconds}`;
        }
    }

}, {
    collection: 'ContentComment',
});

const ContentCommentModel = mongoose.model('ContentComment', ContentCommentSchema);
module.exports = ContentCommentModel;





