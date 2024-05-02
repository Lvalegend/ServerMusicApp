
const mongoose = require('mongoose');
const config = require('../../config');

// Establish connection with MongoDB
// mongoose.connect(config.uri_connection.uri , {dbName: 'ServerMusicApp'});
mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`);

// Wait for the connection to be established
mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');

    const SingerModel = require('../models/singer'); // Adjust the path to ManagerModel

    // Create an array of new documents
    const singers = [
        {
            _id: "Singer_1",
            nameSinger: "ACV",
            dateOfBirth: new Date('1990-04-15'),
            national: "Việt Nam",
            songId: "Song_1"
    
        },
        {
            _id: "Singer_2",
            nameSinger: "Hồ Quang Hiếu",
            dateOfBirth: new Date('1992-04-17'),
            national: "Việt Nam",
            songId: "Song_2"
        },
        {
            _id: "Singer_3",
            nameSinger: "Hồ Quang Hiếu",
            dateOfBirth: new Date('1992-04-17'),
            national: "Việt Nam",
            songId: "Song_3"
        },
        
        {
            _id: "Singer_4",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_4"
        },{
            _id: "Singer_5",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_5"
        },{
            _id: "Singer_6",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_6"
        },{
            _id: "Singer_7",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_7"
        },{
            _id: "Singer_8",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_8"
        },{
            _id: "Singer_9",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1980-01-19'),
            national: "Việt Nam",
            songId: "Song_9"
        },{
            _id: "Singer_10",
            nameSinger: "Cẩm Ly",
            dateOfBirth: new Date('1999-03-19'),
            national: "Việt Nam",
            songId: "Song_10"
        },
        
    ];

    try {
        // Insert the array of documents into the Manager collection
        const result = await SingerModel.insertMany(singers);
        console.log('Inserted documents successfull:', result);
    } catch (err) {
        console.error('Error inserting documents:', err);
    } finally {
        // Ensure to close the connection after operations
        mongoose.connection.close();
        console.log('Connection to MongoDB closed');
    }
});

