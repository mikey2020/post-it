/**
 * @description - It returns a error message
 *
 * @param {Object} response
 *
 * @returns {Object} - It returns a response object containing a message
 */
const returnServerError = response =>
response.status(500).json({ message: 'Internal Server Error' });


export default returnServerError;
