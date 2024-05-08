const mongoose = require('mongoose');
const config = require('../../config');
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);
// Wait for the connection to be established
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');

    const SongModel = require('../models/song');

    // Create an array of new documents
    const songs = [
        {
            _id: "Song_11",
            nameSong: "Hết Thương Cạn Nhớ",
            imageLink: 'https://www.google.com.vn/imgres?q=%E1%BA%A3nh%20%C4%91%E1%BA%B9p&imgurl=https%3A%2F%2Fimages2.thanhnien.vn%2F528068263637045248%2F2024%2F1%2F25%2Fe093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg&imgrefurl=https%3A%2F%2Fthanhnien.vn%2Fchiem-nguong-nhung-buc-anh-thien-nhien-dep-nhat-the-gioi-18524012511141175.htm&docid=puKSkxEDe95frM&tbnid=u7ReXJ-C8BGLeM&vet=12ahUKEwjFx_zbxfCFAxVLna8BHcfuBKQQM3oECBMQAA..i&w=880&h=587&hcb=2&ved=2ahUKEwjFx_zbxfCFAxVLna8BHcfuBKQQM3oECBMQAA',
            songLink: "../",
            singerId: "Singer_11",
            managerId: "Manager_11",
        }
    ]

    try {
        // Insert the array of documents into the Song collection
        const result = await SongModel.insertMany(songs);
        console.log('Inserted documents:', result);
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        // Ensure to close the connection after operations
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
});
