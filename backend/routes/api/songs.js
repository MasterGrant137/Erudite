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
    res.json(songs);
}));

router.get('/:id', asyncHandler(async(req, res) => {
    const song = await Song.findOne({
        where: {
            songID: req.params.id
         },
         include: User
    })
    res.json(song)
}))


router.get('/:id/comments', asyncHandler(async(req, res) => {
    const comments = await Comment.findAll({
        where: {
            songID: req.params.id
        },
        include: User
    })
    res.json(comments)
}))

router.post(':id/comments', validateComment, asyncHandler(async(req, res) => {
    const { userID, songID, body } = req.body;

    const commentSubmission = await Comment.create({
        userID,
        songID,
        body
    });

    const { id } = commentSubmission;
    const comment = await Comment.findByPk(id, {
        include: User
    });
    res.json(comment)
}))

router.get('/:id/annotations', asyncHandler(async(req, res) => {
    const annotations = await Annotation.findAll({
        where: {
            songID: req.params.id,
        },
        include: User
    })
    res.json(annotations)
}))

router.post('/:id/annotations', asyncHandler(async(req, res) => {
    const { userID, songID, body, startPos, endPos } = req.body;
    const annotationSubmission = await Annotation.create({
        userID,
        songID,
        body,
        startPos,
        endPos
    })
    const { id } = annotationSubmission;
    const annotation = await Annotation.findByPk(id, {
        include: User
    })
    res.json(annotation)
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
