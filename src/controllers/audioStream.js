const fs = require("fs");

const audioStream = async (req, res, next) => {
    
    const audioPath = 'src\\music\\file bài hát\\3 thằng bạn\\3-Thang-Ban-Karik.mp3'
    const headers = {
        "Content-Type": "audio/mp3",
    };

    res.writeHead(200, headers);
    const audioStream = fs.createReadStream(audioPath);
    audioStream.pipe(res);


}

module.exports = audioStream;
