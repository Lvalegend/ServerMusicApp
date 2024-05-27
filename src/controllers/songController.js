const SongModel = require('../models/song');
const fs = require('fs');
const SingerModel = require('../models/singer'); // Đảm bảo đã import SingerModel

const infoSong = async (req, res, next) => {
  try {
    const songs = await SongModel.find().populate('singerId', 'nameSinger');

    return res.status(200).json(songs);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const songImage = async (req, res, next) => {
  try {
    const songId = req.query.id; // Truy cập ID từ query parameters
    const songs = await SongModel.findById(songId).exec(); // Sử dụng ID để tìm kiếm thông tin về bài hát
    console.log(songs);
    const imageStream = fs.createReadStream(songs.imageLink);
    imageStream.on('open', function() {
        res.setHeader('Content-Type', 'image/jpeg'); // Thiết lập loại MIME tương ứng
        imageStream.pipe(res); // Gửi dữ liệu từ luồng tới phản hồi HTTP
    });
    imageStream.on('error', function(err) {
        console.error('Lỗi khi mở tệp:', err);
        res.statusCode = 404; 
        res.end('Tệp không tồn tại hoặc không thể mở.'); 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchSongByName = async (req, res) => {
  try {
    const searchKeyword = req.body.searchKeyword;
    
    // Kiểm tra nếu searchKeyword bị bỏ trống
    if (!searchKeyword || searchKeyword.trim() === "") {
      return res.status(400).json({ message: 'Search keyword is required' });
    }

    const regex = new RegExp(searchKeyword, 'i');
    const songs = await SongModel.find({ nameSong: regex });
    const songIds = songs.map(song => song.nameSong);

    return res.status(200).json({ songIds });
  } catch (error) {
    console.error('Error searching songs:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { infoSong, songImage, searchSongByName };
