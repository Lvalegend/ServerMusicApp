const fs = require('fs');
const SongModel = require('../models/song');
const id = "Song_10";

async function updateImage() {
    try {
        // Đọc nội dung của file ảnh
        const fileData = fs.readFileSync("src/music/file bài hát/Có hẹn với thanh xuân/maxresdefault (1).jpg");

        // Chuyển đổi dữ liệu của file ảnh sang dạng binary
        const binary = Buffer.from(fileData);

        // Cập nhật trường imageLink của bản ghi bài hát
        const updatedSong = await SongModel.findByIdAndUpdate(id, { imageLink: binary }, { new: true });

        console.log("Updated document:", updatedSong);
    } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu có
    }
}

updateImage();

