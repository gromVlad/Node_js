const express = require('express');
const commentsRouter = require('./comments');
const usersRouter = require('./users');
const rootRouter = require('./root');

const router = express.Router();

//use  работает по не точному пути да же если будет например comments/id... то все равно будет работать но такие пути как get и т.д. работают только по точному совпадению
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);
router.use('/', rootRouter);

module.exports = router;
