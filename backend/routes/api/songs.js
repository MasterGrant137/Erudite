const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { Song } = require('../../db/models');

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

router.get('/my-songs', asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const songs = await Song.findAll({ where: { userID } });
    return res.json(songs);
}));

router.get('/:title/lyrics', asyncHandler(async(req, res) => {
  const title = req.params.title;
  const song = await Song.findOne({ where: { title } });
  if (song) return res.json(song);
  else return { errors: ['No results.'] };
}));

router.post('/', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const { artist, title, producer, body, media, coverArt } = req.body;
    const createdSong = await Song.create({ userID, artist, title, producer, body, media, coverArt });
    res.json(createdSong);
}));


router.patch('/:id/edit', submissionValidation, asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const songObj = { songID, artist, title, producer, body, media, coverArt } = req.body;
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
}));

router.delete('/:id/delete', asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;
    const id = req.params.id;
    const song = await Song.findByPk(id);

    if (userID === song.userID) {
        await Song.destroy({ where: { id } });
        return res.json({ message: 'success' });
    } else return res.json({ message: 'forbidden' });
}));


module.exports = router;
