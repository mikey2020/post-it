const handleInvalidNumber = (id, response) => {
  if (isNaN(id)) {
    return response.status(400).json({ message: 'Id must be a number' });
  }
};


export default handleInvalidNumber;
