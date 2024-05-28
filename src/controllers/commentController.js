const CommentModel = require("../models/comment");
const AccountModel = require("../models/account");
const jwt = require('jsonwebtoken');
const config = require('../../config');

const addInfoComment = async (req, res, next) => {
  const { token, songId, socketChat, message, originMessageId } = req.body.data
  let id = null
  jwt.verify(token, config.jwtSecret, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    id = req.user.userId;
    console.log(id);
  })
  try {
    const comments = await CommentModel.insertMany({ userId: id, songId: songId, socketChat: socketChat, message: message, originMessageId: originMessageId })
    console.log(comments);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getInfoComment = async (req, res, next) => {
  const songId = req.query.id
  try {
    const comments = await CommentModel.find({ songId: songId }).populate('userId', 'name avatar')
    console.log(comments);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = { addInfoComment, getInfoComment }