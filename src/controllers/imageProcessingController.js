const AccountModel = require('../models/account');
const upload = require('../upload_images/upload_image');
const fileNameUpload = upload.single('avatar');
const fs = require('fs');
// chuyển ảnh từ người dùng thành dnagj binary và lưu vào cơ sở dữ liệu
const responeImageUpload = async (req, res, next) => {
    try {
        // Kiểm tra xem có file được tải lên không
        if (!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        console.log(req.file.path);
        // Đọc dữ liệu của file
        const fileData = fs.readFileSync(req.file.path);

        // Chuyển đổi dữ liệu file thành dạng binary
        const binary = Buffer.from(fileData);

        // Lấy ID của người dùng từ request
        const userId = req.user.userId;
        console.log(userId);
        
        // Cập nhật avatar của người dùng trong cơ sở dữ liệu
        await AccountModel.findByIdAndUpdate(userId, { avatar: binary });

        // Trả về thông báo thành công
        res.status(200).send('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Lấy ảnh từ database ra và chuyển về dạng base64
const tranformImage = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        // Tìm người dùng theo ID và chọn trường avatar
        const user = await AccountModel.findById(userId).select('avatar').exec();

        // Nếu không tìm thấy người dùng hoặc không có avatar
        if (!user || !user.avatar) {
            return res.status(404).send('Image not found');
        }

        // Chuyển đổi dữ liệu avatar từ buffer sang định dạng base64
        const imageData = "data:image/png;base64," + user.avatar.toString("base64");

        // Gửi dữ liệu ảnh về client
        res.status(200).send(imageData);
    } catch (error) {
        console.error('Error transforming image:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { fileNameUpload, responeImageUpload, tranformImage };
