
const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    _id: {
        type: String,
        required: true,
        auto: false
    },
    nameCategory: {
        type: String,
    },
    description:{
        type: String,
    }
}, {
    collection: 'Category',
});
const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel
