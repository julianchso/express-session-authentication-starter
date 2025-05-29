import crypto from 'crypto';

// TODO
function validPassword(password, hash, salt) {}
function genPassword(password) {}

const _validPassword = validPassword;
export { _validPassword as validPassword };
const _genPassword = genPassword;
export { _genPassword as genPassword };
