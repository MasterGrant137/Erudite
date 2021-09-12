const router = require('express').Router();
const apiRouter = require('./api');

router.use('/erudite', apiRouter);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    //? Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
    });

    //? Serve the static assets in the frontend's build folder
    router.use(express.static(path.resolve("../frontend/build")));

    //? Serve the frontend's index.html file at all other routes NOT starting with /erudite
    router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'build', 'index.html')
      );
    });
  }

//? Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/erudite/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
}

//? base test route
// router.get('/hello/world', function(req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send(`I'm alive!`);
// });

module.exports = router;
