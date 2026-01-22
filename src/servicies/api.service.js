const { addUserDB, getByEmailDB } = require('../repositories/api.repository');
const bcrypt = require('bcrypt');
const saltround = 10;

async function addUser(username, mail, password, created_at) {
  const hashedPassword = await bcrypt.hash(password, saltround);

  const result = await addUserDB(username, mail, hashedPassword, created_at);

  if (!result.length) throw new Error('Api Validation Error');

  return result;
}

async function authUser(mail, password) {
  const auth = await getByEmailDB(mail);

  if (!auth.length) throw new Error('Mail Validation Error');

  const hashedPassword = auth[0].password;

  if (!(await bcrypt.compare(password, hashedPassword))) throw new Error('Password Validation Error');

  return auth;
}

module.exports = { addUser, authUser };
