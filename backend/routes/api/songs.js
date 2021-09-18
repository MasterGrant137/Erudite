const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, Comment, Index, Annotation } = require('../../db/models');

const commentValidation = [
    check('body')
    .exists({checkFalsy: true})
    .withMessage('Please include text.'),
    handleValidationErrors,
]

router.get('/', asyncHandler(async(req, res) => {
    const songs = await Song.findAll({
        order: [['visits', 'DESC']],
        limit: 20
    });
    return res.json(songs);
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const song = await Song.findOne({
        where: {
            songID: req.params.id
         }
    })
}))


// router.get('/search', asyncHandler(async(req, res) => {
//     const query = req.url

//     const songs = await Song.findAll({
//         where: {
//             title: {
//                 [Op.like]: `%${query}%`
//             }
//         }
//     })
    // const results = await Song.findAll({
    //     limit: 1
    // });
    // return res.json(songs);
// }))

// let { term } = req.query;
    // return res.json(term);
// :id(\\d+)


module.exports = router;
