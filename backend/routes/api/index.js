const router = require('express').Router();

router.post('/lyrics', function(req, res) {
    res.json({
        requestBody: req.body
    });
});

module.exports = router;
