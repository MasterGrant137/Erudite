const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');


router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [['visits', 'DESC']],
        limit: 20
    });
    return res.json(songs);
}));

// router.get('/search', asyncHandler(async(req, res) => {
//     const query = req.url

//     const songs = await Song.findAll({
//         where: {
//             title: {
//                 [Op.like]: `%${query}%`
//             }
//         }
//     })

//     return res.json(songs);
// }))

// let { term } = req.query;
    // return res.json(term);
// :id(\\d+)


module.exports = router;
