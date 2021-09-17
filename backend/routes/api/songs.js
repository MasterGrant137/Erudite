const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [['visits', 'DESC']],
        limit: 20
    });
    return res.json(songs);
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
    let { term } = req.query;
    return term;
}))

module.exports = router;
