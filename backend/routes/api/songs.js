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
        limit: 10
    });
    return res.json(songs);
}));

router.get('/:title/lyrics', asyncHandler(async(req, res) => {

    const title = req.params.title;

    console.log(`THIS IS THE TITLE`, title);

    const songs = await Song.findAll({
            where: {
                title
            }
        });
    // const songs = await Song.findAll();
        console.log(`THIS IS SONGS IN API`,songs);
        return res.json(songs);
        // const song = await Song.findAll({
        //     where: {
        //         title: {
        //             [Op.iRegexp]:
        //         }
        //     }
        // })
}))

router.post('/', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const {
            artist,
            title,
            producer,
            body,
            media,
            coverArt
          } = req.body;

    const createdSong = await Song.create({
        userID,
        artist,
        title,
        producer,
        body,
        media,
        coverArt
    });

    res.json(createdSong);
}))

router.patch('/:id/edit', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const songObj = {
                      songID,
                      artist,
                      title,
                      producer,
                      body,
                      media,
                      coverArt
                    } = req.body;

    const song = await Song.findByPk(songObj.songID);

    if (userID === song.userID) {
        song.artist = artist;
        song.title = title;
        song.producer = producer;
        song.body = body;
        song.media = media;
        song.coverArt = coverArt;

        song.save();

        const editedSong = await Song.findByPk(songObj.songID);

        res.json(editedSong);
    } else {
        console.error('Not permitted.')
    }
}))


module.exports = router;
