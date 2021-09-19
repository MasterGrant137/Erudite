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


router.post(
    '/',
    commentValidation,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );


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
