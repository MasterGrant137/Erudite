const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song, Comment, Index, Annotation } = require('../../db/models');

router.get('/', asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    const songs = await Song.findAll({
        where: {
            userID
        }
    });
    return res.json(songs);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const jwtToken = req.cookies.token;
    const base64UserID = jwtToken.split('.')[1].replace('-', '+').replace('_', '/');
    const parsedUserInfo = JSON.parse(Buffer.from(base64UserID, 'base64'));
    const userID = parsedUserInfo.data.id;

    // const { songID } = req.body
  //  const songs =
    //  await Song.findAll({
    //     where: {
    //         songID
    //     }
    // });

    console.log(`THIS IS THE REQ`, req);
    const song = await Song.findByPk(req.params.id)
//const songKiller =
    await Song.destroy({
        where: {
            id:song.id
        }
    });

    // if (userID === songs[0].userID) {



    // }


    return res.json({
        message: 'success'
    });
}));



module.exports = router;
