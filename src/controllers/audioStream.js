const fs = require("fs");
const SongModel = require('../models/song');

const audioStream = async (req, res, next) => {
    const songId = req.query.id; // Truy cập ID từ query parameters
    const songs = await SongModel.findById(songId).exec(); // Sử dụng ID để tìm kiếm thông tin về bài hát
    console.log(songs);
    if (!!songs) {
        const audioPath = songs.songLink
        const headers = {
            "Content-Type": "audio/mp3",
        };

        res.writeHead(200, headers);
        const audioStream = fs.createReadStream(audioPath);
        audioStream.pipe(res);
    }
    else {
        res.end("Error")
    }


}

module.exports = audioStream;
