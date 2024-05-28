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

    // Nếu searchKeyword không tồn tại hoặc bị bỏ trống, truy vấn tất cả bài hát
    if (!searchKeyword || searchKeyword.trim() === "") {
      const songs = await SongModel.find();
      return res.status(200).json(songs);
    }

    const regex = new RegExp(searchKeyword, 'i');
    const songs = await SongModel.find({ nameSong: regex });
    return res.status(200).json(songs);
  } catch (error) {
    console.error('Error searching songs:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};




const createSong = async (req, res) => {
  try {
      const { nameSong, imageLink, songLink, diration, singerId, managerId } = req.body;
      const newSong = new SongModel({
        nameSong,
        imageLink,
        songLink,
        diration,
        singerId,
        managerId
      });

      await newSong.save();
      return res.status(201).json(newSong);
  } catch (error) {
      console.error('Error creating album:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};

const getSongById = async (req, res) => {
  try {
      const songId = req.params.id;
      const song = await SongModel.findById(songId);

      if (!song) {
          return res.status(404).json({ message: 'Song not found' });
      }

      return res.status(200).json(song);
  } catch (error) {
      console.error('Error getting song by ID:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { infoSong, songImage, searchSongByName, createSong, getSongById };
