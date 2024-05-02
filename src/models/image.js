const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
const Schema = mongoose.Schema;
// Định nghĩa schema cho Song
const ImageSchema = new Schema({
      path:{
        type: Buffer
      }
    
}, {
    collection: 'Image',
});


const ImageModel = mongoose.model('Image', ImageSchema);
module.exports = ImageModel;





