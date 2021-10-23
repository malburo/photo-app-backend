import Result from '../../helpers/result.helper';

function checkEmail(email) {
  const filter = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/;
  if (!filter.test(email)) {
    return false;
  }
  return true;
}

function validateFormRegister(req, res, next) {
  try {
    const { fullname, email, password, retypePassword } = req.body;
    if (fullname === '') {
      return Result.error(res, { message: 'Please enter your fullname' });
    }
    if (email === '') {
      return Result.error(res, { message: 'Please enter your email' });
    }
    if (password === '') {
      return Result.error(res, { message: 'Please enter your password' });
    }
    if (retypePassword === '') {
      return Result.error(res, { message: 'Please retype your password' });
    }
    if (fullname.length < 2 || fullname.length > 35) {
      return Result.error(res, { message: 'Fullname must be a string between 2-35 characters' });
    }
    if (email.length < 6 || email.length > 35) {
      return Result.error(res, { message: 'Email must be a string between 6-35 characters' });
    }
    if (password.length < 6 || password.length > 35) {
      return Result.error(res, { message: 'Password must be a string between 6-35 characters' });
    }
    if (password !== retypePassword) return Result.error(res, { message: 'Password does not match' });

    if (checkEmail(email) === false) return Result.error(res, { message: 'Please enter a valid email address' });

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

function validateFormLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (email === '') {
      return Result.error(res, { message: 'Please enter your email' });
    }
    if (password === '') {
      return Result.error(res, { message: 'Please enter your password' });
    }
    if (email.length < 6 || email.length > 35) {
      return Result.error(res, { message: 'Email must be a string between 6-35 characters' });
    }
    if (password.length < 6 || password.length > 35) {
      return Result.error(res, { message: 'Password must be a string between 6-35 characters' });
    }
    if (checkEmail(email) === false) return Result.error(res, { message: 'Please enter a valid email address' });
    next();
  } catch (error) {
    next(error);
  }
}

const authValidate = { validateFormRegister, validateFormLogin, checkEmail };
export default authValidate;
