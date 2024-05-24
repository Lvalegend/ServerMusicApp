const fs = require('fs');
const SongModel = require('../models/song');
const id = "Song_2";

async function updateImage() {
    try {
        // Đọc nội dung của file ảnh
        let fileData = "src\\music\\file bài hát\\3 thằng bạn\\4d4b85494abdd97178d9211f89508afb_1322125478.jpg"
       
        // Cập nhật trường imageLink của bản ghi bài hát
        const updatedSong = await SongModel.findByIdAndUpdate(id, { imageLink: fileData }, { new: true });

    console.log("Updated document:", updatedSong);
} catch (error) {
    console.error(error);
    // Xử lý lỗi nếu có
}
}

updateImage();

