const jwt = require('jsonwebtoken'); // Import thư viện JWT
const config = require('../../config'); // Import file cấu hình chứa các thông tin cho JWT
const AccountModel = require('../models/account');

// Hàm xử lý yêu cầu đăng ký người dùng
const register = async (req, res, next) => {
    try {
        // Lấy thông tin từ body của yêu cầu
        const { name, password, email } = req.body;

        // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await AccountModel.findOne({ name });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            // Tạo tài khoản mới
            const newUser = await AccountModel.create({
                name: name,
                email: email,
                password: password
            });


            // Tạo JWT cho người dùng mới
            const token = jwt.sign({ userId: newUser._id }, config.jwtSecret, { expiresIn: '50h' }); // Thời gian sống của token là 50 giờ
            
            // Trả về thông báo đăng ký thành công và JWT để tự đăng nhập
            return res.status(200).json({ message: ' Register Successful', token, redirect: '/HomeScreen' });
        }

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Hàm xử lý yêu cầu đăng nhập người dùng
const login = async (req, res, next) => {
    try {
        // Lấy thông tin từ body của yêu cầu
        const { email, password } = req.body;

        // Kiểm tra xác thực thông tin đăng nhập
        const account = await AccountModel.findOne({ email, password });

        if (!account) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Tạo JWT cho người dùng đã đăng nhập
        const token = jwt.sign({ userId: account._id }, config.jwtSecret, { expiresIn: '50h' }); // Thời gian sống của token là 50 giờ

        // Trả về kết quả thành công và JWT để tự đăng nhập
        return res.status(200).json({ message: 'Login successful', token, redirect: '/HomeScreen'});

    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserInfo = async (req, res, next) => {
    try {
        // Lấy thông tin người dùng từ cơ sở dữ liệu
        const userId = req.user.userId;

        // Tìm người dùng theo ID 
        const user = await AccountModel.findById(userId).select({}).exec();

        // Nếu không tìm thấy người dùng, trả về lỗi
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user)
    } catch (error) {
        console.error('Error getting user info:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = { register, login , getUserInfo};
