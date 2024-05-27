const express = require('express');
const { register, login, getUserInfo  } = require('../controllers/accountController');
const { fileNameUpload, responeImageUpload, tranformImage } = require('../controllers/imageProcessingController');
const {infoSong,songImage, searchSongByName} = require('../controllers/songController');
const authenticateToken  = require('../middlewares/authenticateToken');
const checkLogin = require('../middlewares/checkLogin');
const infoCategory = require('../controllers/categoryController');
const {getAlbum, createAlbum, addSongToAlbum, removeSongFromAlbum} = require('../controllers/albumController')
const router = express.Router();

// Route đăng ký người dùng
router.post('/register', register);

// Route đăng nhập người dùng
router.post('/login', login);

// Route để lấy dữ liệu bài hát và ca sĩ
router.get('/songs', infoSong)

// Route để lấy ảnh bài hát 
router.get('/songImages', songImage)

// Route tìm kiếm bài hát
router.post('/search', searchSongByName)

// Route để lấy dữ liệu về thể loại
router.get('/categories', infoCategory)

// Đường dẫn để upload ảnh
router.post('/upload', fileNameUpload, authenticateToken, responeImageUpload);

// Route để chuyển ảnh về Image và lấy về client
router.get('/avatar', authenticateToken, tranformImage)

// Route lấy thông tin người dùng
router.get('/infoUser', authenticateToken, getUserInfo)

// Route lấy thông tin album
router.get('/inforAlbum', getAlbum)

//Route tạo 1 album mới
router.post('/album', createAlbum)

//Route cập nhật 1 bài hát vào 1 album
router.put('/album/:albumId/songs/:songId', addSongToAlbum);

//Route xóa 1 bài hát từ 1 album
router.delete('/album/:albumId/songs/:songId', removeSongFromAlbum)
module.exports = router;
