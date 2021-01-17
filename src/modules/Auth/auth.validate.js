import Result from '../../helpers/result.helper';

function validateFormRegister(req, res, next) {
  try {
    const { fullname, email, password } = req.body;
    if ((fullname === '' || email === '', password === '')) {
      return Result.error(res, { message: 'Không được để trống' });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export default validateFormRegister;
