import crypto from 'crypto';

// TODO
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return { salt: salt, hash: genHash };
}

function validatePassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

const _validPassword = validatePassword;
export { _validPassword as validatePassword };
const _genPassword = genPassword;
export { _genPassword as genPassword };
