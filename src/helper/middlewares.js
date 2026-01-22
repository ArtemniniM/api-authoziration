function bodyCheckAuth(req, res, next) {
  const { mail, password } = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const emailRegex = /^[A-Za-z0-9\.\_]+@[a-z]+.[a-z]{2,}/gm;

  if (!emailRegex.test(mail)) throw new Error('Email Required Error');

  if (!passwordRegex.test(password)) throw new Error('Password Required Error');

  next();
}

function bodyCheckUserInfo(req, res, next) {
  const { username, created_at } = req.body;
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  const name_surnameRegex = /^[А-Яа-яA-Za-z -]+$/;

  if (!name_surnameRegex.test(username)) throw new Error('Username Required Error');

  if (!dateRegex.test(created_at)) throw new Error('Invalid Date');

  next();
}

module.exports = { bodyCheckAuth, bodyCheckUserInfo };
