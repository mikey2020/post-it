/**
 * @description - It validates numbers
 *
 * @param {Number} id
 * @param {Object} response
 *
 * @returns {Object} - It returns a response object containing a message
 */
const handleInvalidNumber = (id, response) => {
  if (isNaN(id)) {
    return response.status(400).json({ message: 'Id must be a number' });
  }
};


export default handleInvalidNumber;
