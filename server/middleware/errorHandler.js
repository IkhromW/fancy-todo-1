const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  //console.log(err.errors[0].message)
  console.log(err);
  
  
  let msg = ''
  let status
  switch (err.name) {
    case 'SequelizeUniqueConstraintError':
      msg = 'Email already exist'
      status = 400
      break;
    case 'SequelizeValidationError':
      msg = err.errors[0].message
      if(msg === 'User.email cannot be null'){
        msg = 'email is required'
      }
      status = 400
      break;
    case 'LoginFailed': 
    case 'DataNotFound':
    case 'StatusError':
    case 'AuthenticationFailed':
    case 'AuthorizationFailed':
      msg = err.msg
      status = err.status
      break;
    default:
      msg = 'Internal Server Error'
      status = 500
      break;
  }
  
  res.status(status).send({error : msg})
}

module.exports = errorHandler