const express = require('express');
const { register, login, getUserInfo  } = require('../controllers/accountController');
const { fileNameUpload, responeImageUpload, tranformImage } = require('../controllers/imageProcessingController');
const {infoSong,songImage} = require('../controllers/songController');
const authenticateToken  = require('../middlewares/authenticateToken');
const checkLogin = require('../middlewares/checkLogin');

const infoCategory = require('../controllers/categoryController');
const checkDecentralizationUser = require('../middlewares/decentralizationUser');
const audioStream = require('../controllers/audioStream');


const router = express.Router();

// Route đăng ký người dùng
router.post('/register', register);

// Route đăng nhập người dùng
router.post('/login', login);

// Route để lấy dữ liệu bài hát và ca sĩ
router.get('/songs', infoSong)

// Route để lấy ảnh bài hát 
router.get('/songImages', songImage)

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


module.exports = router;
