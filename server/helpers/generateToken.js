import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @description - It generates a jwt token
 *
 * @param {Object} user
 *
 * @returns {String} - It returns a jwt token
 */
const generateToken = (user) => {
  const token = jwt.sign({ data: user },
  process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
  return token;
};


export default generateToken;
