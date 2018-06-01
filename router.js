const router = require('express').Router();
const controller = require('./controller');

router.route('/login')
  .get(controller.getUser)
