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

router.get('/:title/list', asyncHandler(async(req, res) => {
    const title = req.params.title;
    const song = await Song.findOne({ where: { title } })
    const comments = await Comment.findAll({ where: { songID: song.id } });
    return res.json(comments);
}));

router.post('/:title/list', submissionValidation, asyncHandler(async(req, res) => {
    if (!req.cookies.token) {
        const err = new Error('Comment failed')
        err.status = 401;
        err.title = 'Comment failed';
        err.error = 'You have to be signed in to comment.';
        res.json(err);
    }

    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const { title, body } = req.body;
    const song = await Song.findOne({ where: { title } });
    const songID = song.id;
    const createdComment = await Comment.create({
        userID,
        songID,
        body
     });

    res.json(createdComment);
}))

module.exports = router;
