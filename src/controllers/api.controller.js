const express = require('express');
const router = express.Router();
const { addUser, authUser } = require('../servicies/api.service');
const { bodyCheckAuth, bodyCheckUserInfo } = require('../helper/middlewares');

router.post('/reg', bodyCheckAuth, bodyCheckUserInfo, async (req, res) => {
  try {
    const { username, mail, password, created_at } = req.body;
    res.status(200).send(await addUser(username, mail, password, created_at));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.post('/auth', bodyCheckAuth, async (req, res) => {
  try {
    const { mail, password } = req.body;
    res.status(200).send(await authUser(mail, password));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
