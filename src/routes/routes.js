const express = require('express');
const { register, login, getUserInfo  } = require('../controllers/accountController');
const { fileNameUpload, responeImageUpload, tranformImage } = require('../controllers/imageProcessingController');
const {infoSong,songImage, searchSongByName, createSong, getSongById} = require('../controllers/songController');
const authenticateToken  = require('../middlewares/authenticateToken');
const checkLogin = require('../middlewares/checkLogin');

const infoCategory = require('../controllers/categoryController');
const {getAlbum, createAlbum, addSongToAlbum, removeSongFromAlbum, albumImage} = require('../controllers/albumController')
const checkDecentralizationUser = require('../middlewares/decentralizationUser');
const audioStream = require('../controllers/audioStream');
const {getPlaylist, createPlaylist, addSongToPlaylist, removeSongFromPlaylist, playlistImage, getPlaylistById} = require('../controllers/playlistController')


const router = express.Router();

// Route đăng ký người dùng
router.post('/register', register);

// Route đăng nhập người dùng
router.post('/login', login);

// Route để lấy dữ liệu bài hát và ca sĩ
router.get('/songs', infoSong)

router.post("/createSong", createSong)

// Route để lấy ảnh bài hát 
router.get('/songImages', songImage)

// Route tìm kiếm bài hát
router.post('/search', searchSongByName)

// Route tìm kiếm bài hát
router.get('/song/:id', getSongById)

// Route để lấy dữ liệu về thể loại
router.get('/categories', infoCategory)

// Đường dẫn để upload ảnh
router.post('/upload', fileNameUpload, authenticateToken, responeImageUpload);

// Route để chuyển ảnh về Image và lấy về client
router.get('/avatar', authenticateToken, tranformImage)

// phân quyền người dùng
router.get('/decentralization', checkLogin, checkDecentralizationUser )

// Route lấy thông tin người dùng
router.get('/infoUser', authenticateToken, getUserInfo)

router.get('/audio', audioStream)
// Route lấy thông tin album
router.get('/inforAlbum', getAlbum)

//Route tạo 1 album mới
router.post('/album', createAlbum)

//Route cập nhật 1 bài hát vào 1 album
router.put('/album/:albumId/songs/:songId', addSongToAlbum);

//Route xóa 1 bài hát từ 1 album
router.delete('/album/:albumId/songs/:songId', removeSongFromAlbum)

// Route để lấy ảnh album 
router.get('/albumImages', albumImage)

// Route lấy thông tin playlist
router.get('/inforPlaylist', getPlaylist)

//Route tạo 1 playlist mới
router.post('/playlist', createPlaylist)

//Route cập nhật 1 bài hát vào 1 playlist
router.put('/playlist/:playlistId/songs/:songId', addSongToPlaylist);

//Route xóa 1 bài hát từ 1 playlist
router.delete('/playlist/:playlistId/songs/:songId', removeSongFromPlaylist)

// Route để lấy ảnh playlist 
router.get('/playlistImages', playlistImage)

// Route để lấy playlist theo id
router.get('/playlist/:id', getPlaylistById)

module.exports = router;
