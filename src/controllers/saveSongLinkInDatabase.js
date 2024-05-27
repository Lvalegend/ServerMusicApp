const fs = require('fs');
const SongModel = require('../models/song');
const id = "Song_11";

async function updateImage() {
    try {
        // Đọc nội dung của file ảnh
        let fileData = "src\\music\\file bài hát\\Có hẹn với thanh xuân\\co-hen-voi-thanh-xuan-MONSTAR.mp3"
       
        // Cập nhật trường imageLink của bản ghi bài hát
        const updatedSong = await SongModel.findByIdAndUpdate(id, { songLink: fileData }, { new: true });

    console.log("Updated document:", updatedSong);
} catch (error) {
    console.error(error);
    // Xử lý lỗi nếu có
}
}

updateImage();

