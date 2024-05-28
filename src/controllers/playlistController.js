const PlaylistModel = require('../models/playlist');
const fs = require('fs');

const getPlaylist = async(req, res) => {
    try {
        const playlists = await PlaylistModel.find();
        return res.status(200).json(playlists);
    } catch(error) {
        console.error('Error getting playlists:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const createPlaylist = async (req, res) => {
    try {
        const { name, color, image, songs } = req.body;
        const newPlaylist = new PlaylistModel({
            name,
            color,
            image,
            songs: songs
        });

        await newPlaylist.save();
        return res.status(201).json(newPlaylist);
    } catch (error) {
        console.error('Error creating album:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const playlist = await PlaylistModel.findById(playlistId);
        
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        playlist.songs.push(songId);
        await playlist.save();
        
        return res.status(200).json(playlist);
    } catch(error) {
        console.error('Error adding song to playlist:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;
        const playlist = await PlaylistModel.findById(playlistId);
        
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        const index = playlist.songs.indexOf(songId);
        if (index !== -1) {
            playlist.songs.splice(index, 1);
        }

        await playlist.save();
        
        return res.status(200).json(playlist);
    } catch(error) {
        console.error('Error removing song from playlist:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const playlistImage = async (req, res, next) => {
    try {
      const playlistId = req.query.id; // Truy cập ID từ query parameters
      const playlists = await PlaylistModel.findById(playlistId).exec(); // Sử dụng ID để tìm kiếm thông tin về bài hát
      console.log(playlists);
      const imageStream = fs.createReadStream(playlists.image);
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

  const getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.id;
        const playlist = await PlaylistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        return res.status(200).json(playlist);
    } catch (error) {
        console.error('Error getting playlist by ID:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPlaylist, createPlaylist, addSongToPlaylist, removeSongFromPlaylist, playlistImage, getPlaylistById };
