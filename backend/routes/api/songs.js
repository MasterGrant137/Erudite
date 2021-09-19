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
    .withMessage('Please include lyrics.'),
    check('title')
    .exists({checkFalsy: true})
    .withMessage('Please include title.'),
    check('artist')
    .exists({checkFalsy: true})
    .withMessage('Please include artist.'),
    handleValidationErrors,
]

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [['visits', 'DESC']],
        limit: 20
    });
    return res.json(songs);
}));


router.post('/', submissionValidation, asyncHandler(async(req, res) => {
    const {
            artist,
            title,
            producer,
            body,
            media,
            coverArt
          } = req.body;

    const createdSong = await Comment.create({
        artist,
        title,
        producer,
        body,
        media,
        coverArt
    });

    const {id} = createdSong;
    const song = await Song.findByPk(id, {
        include: User
    });
    res.json(song);
}))


// router.get('/my-songs/:id', asyncHandler(async(req, res) => {
//     const songs = await Song.findAll({
//         where: {
//             title: req.params.id,
//             userID: req.session.auth.userID
//         }
//     })

//     return res.json(songs);
// }))

// router.get('/songs/:id', asyncHandler(async(req, res) => {
//     const songs = await Song.findAll({
//         where: {
//             title: req.params.id
//         }
//     })

//     return res.json(songs);
// }))


module.exports = router;
