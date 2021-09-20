const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, Comment, Index, Annotation } = require('../../db/models');

const submissionValidation = [
    check('body')
    .exists({checkFalsy: true})
    .withMessage('Please include text.'),
]

router.post('/', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;


    // console.log('THIS IS THE REQ:', req)

    const { title, body } = req.body;

    const song = await Song.findAll({
        where: {
            title
        }
    })

    const songID = song[0].id;

    const createdComment = await Comment.create({
        userID,
        songID,
        body
     });

    res.json(createdComment);
}))


module.exports = router;
