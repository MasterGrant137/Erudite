const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Song } = require('../../db/models');

router.get(
    '/songs',
    asyncHandler(async (req, res) => {
      const { artist, title, producer, body, media, visits, coverArt } = req.body;
      const user = await Song.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

module.exports = router;
