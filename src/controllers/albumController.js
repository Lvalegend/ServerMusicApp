const AlbumModel = require('../models/album');
const fs = require('fs');

const getAlbum = async(req, res) => {
    try {
        const albums = await AlbumModel.find();
        return res.status(200).json(albums);
    } catch(error) {
        console.error('Error getting albums:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const createAlbum = async (req, res) => {
    try {
        const { name, color, image, songs } = req.body;
        const newAlbum = new AlbumModel({
            name,
            color,
            image,
            songs: songs
        });

        await newAlbum.save();
        return res.status(201).json(newAlbum);
    } catch (error) {
        console.error('Error creating album:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const addSongToAlbum = async (req, res) => {
    try {
        const { albumId, songId } = req.params;
        const album = await AlbumModel.findById(albumId);
        
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        album.songs.push(songId);
        await album.save();
        
        return res.status(200).json(album);
    } catch(error) {
        console.error('Error adding song to album:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const removeSongFromAlbum = async (req, res) => {
    try {
        const { albumId, songId } = req.params;
        const album = await AlbumModel.findById(albumId);
        
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        const index = album.songs.indexOf(songId);
        if (index !== -1) {
            album.songs.splice(index, 1);
        }

        await album.save();
        
        return res.status(200).json(album);
    } catch(error) {
        console.error('Error removing song from album:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const albumImage = async (req, res, next) => {
    try {
      const albumId = req.query.id; // Truy cập ID từ query parameters
      const albums = await AlbumModel.findById(albumId).exec(); // Sử dụng ID để tìm kiếm thông tin về bài hát
      console.log(albums);
      const imageStream = fs.createReadStream(albums.image);
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

  const getAlbumById = async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await AlbumModel.findById(albumId);

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        return res.status(200).json(album);
    } catch (error) {
        console.error('Error getting album by ID:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAlbum, createAlbum, addSongToAlbum, removeSongFromAlbum, albumImage, getAlbumById };
