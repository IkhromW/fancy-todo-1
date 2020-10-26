const bcrypt = require('bcrypt')

function hashPassword(password){
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, process.env.SALT)

  return hash
}

function comparePassword(password, hash){

  return bcrypt.compareSync(password, hash)

}

module.exports = {
  hashPassword,
  comparePassword
}