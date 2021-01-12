import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
  const access_token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET, {
    // expiresIn: '10m',
  });
  return access_token;
};
