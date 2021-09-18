const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [['visits', 'DESC']],
        limit: 20
    });
    return res.json(songs);
}));

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll()

    return res.json(songs);
}))

// let { term } = req.query;
    // return res.json(term);
// :id(\\d+)


module.exports = router;
