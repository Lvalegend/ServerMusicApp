const AlbumModel = require('../models/album');

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

module.exports = { getAlbum, createAlbum, addSongToAlbum, removeSongFromAlbum };
