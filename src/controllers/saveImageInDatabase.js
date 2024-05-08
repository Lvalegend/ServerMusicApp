const fs = require('fs');
const SongModel = require('../models/song');
const id = "Song_1";

async function updateImage() {
    try {
        // Đọc nội dung của file ảnh
        let fileData = "src\\music\\file bài hát\\Ngày ấy bạn và tôi\\maxresdefault.jpg"
       
        // Cập nhật trường imageLink của bản ghi bài hát
        const updatedSong = await SongModel.findByIdAndUpdate(id, { imageLink: fileData }, { new: true });

    console.log("Updated document:", updatedSong);
} catch (error) {
    console.error(error);
    // Xử lý lỗi nếu có
}
}

updateImage();

