const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { Song, Comment, Annotation } = require('../../db/models');

const submissionValidation = [
    check('body')
    .exists({checkFalsy: true})
    .withMessage('Please include text.'),
    handleValidationErrors
]


router.get('/:songID/list', asyncHandler(async(req, res) => {
    const songID = req.params.songID;
    const comments = await Comment.findOne({ where: { songID } });
    return res.json(comments);
}));


router.post('/', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const { title, body } = req.body;
    const song = await Song.findOne({ where: { title } });
    const songID = song[0].id;

    const createdComment = await Comment.create({
        userID,
        songID,
        body
     });

    res.json(createdComment);
}))


module.exports = router;
