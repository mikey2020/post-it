const returnServerError = response =>
response.status(500).json({ message: 'Internal Server Error' });


export default returnServerError;
