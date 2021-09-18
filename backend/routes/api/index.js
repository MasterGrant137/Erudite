const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')

//? prefixes every file's route with its respective directory name
router.use('/session', sessionRouter);
router.use('/songs', songsRouter);
router.use('/users', usersRouter);

//? for frontend and backend route testing
// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

//? testing user
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

//? testing token in cookies
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

//? testing auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
