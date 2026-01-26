const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
    const result = await authUser(mail, password);
    const token = jwt.sign(result[0], 'sdfjln23jn24j32nkrhb45bhj35v24uio1jxopp431');
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
