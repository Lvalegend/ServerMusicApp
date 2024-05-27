const infoComment = async (req,res,next) => {
    try {
        const songs = await SongModel.find().populate('singerId', 'nameSinger');
    
        return res.status(200).json(songs);
    
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}