const express = require('express');
const sessionRouter = express.Router();

sessionRouter.get('/', (req, res) => {
    if (req.session.views) {
      req.session.views++;
      res.send(`Number of views: ${req.session.views}`);
    } else {
      req.session.views = 1;
      res.send('Welcome to the session demo. Refresh!');
    }
  });

  module.exports = sessionRouter;