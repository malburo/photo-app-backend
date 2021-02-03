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
    if (fullname === '' || email === '' || password === '' || retypePassword === '')
      return Result.error(res, { message: 'Không được để trống!' });

    if (fullname.length < 2 || fullname.length > 30) {
      return Result.error(res, { message: 'Họ tên phải có độ dài từ 2-30 ký tự!' });
    }

    if (password !== retypePassword)
      return Result.error(res, { message: 'Xác nhận mật khẩu không đúng với mật khẩu!' });

    if (checkEmail(email) === false)
      return Result.error(res, { message: 'Vui lòng nhập email đúng định dạng: abc@gmail.com' });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

function validateFormLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return Result.error(res, { message: 'Vui lòng nhập đầy đủ tài khoản, mật khẩu và không được để trống!' });
    }
    if (email.length < 6 || email.length > 35) {
      return Result.error(res, { message: 'Email phải từ 6-35 ký tự!' });
    }
    if (password.length < 6 || password.length > 30) {
      return Result.error(res, { message: 'Mật khẩu phải là chuỗi có độ dài từ 6-30 ký tự!' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

const authValidate = { validateFormRegister, validateFormLogin, checkEmail };
export default authValidate;
