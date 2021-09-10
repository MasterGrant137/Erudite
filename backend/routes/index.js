const router = require('express').Router();
const apiRouter = require('./api');

router.use('/erudite', apiRouter);

router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send(`I'm alive!`);
});

module.exports = router;
