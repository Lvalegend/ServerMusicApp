const SongModel = require('../models/song');
const SingerModel = require('../models/singer'); // Đảm bảo đã import SingerModel
const fs = require('fs');
const path = require('path');

const infoSong = async (req, res, next) => {
    try {
        const songs = await SongModel.find().populate('singerId', 'nameSinger');

        // Chuyển đổi liên kết ảnh sang base64
        songs.forEach(song => {
            if (song.imageLink && fs.existsSync(song.imageLink)) {
                const imageData = fs.readFileSync(song.imageLink);
                const base64Image = Buffer.from(imageData).toString('base64');
                song.imageLink = `data:image/png;base64,${base64Image}`;
            }
        });
    
        return res.status(200).json(songs);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = infoSong;
