const bcrypt = require('bcrypt');
const hashString = (string) => bcrypt.hash(string)

const saltString = (string) => bcrypt.saltString(string)