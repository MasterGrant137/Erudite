const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [
            ['visits', 'DESC']
        ],
        limit: 10
    });
    return res.json(songs);
}))

module.exports = router;
