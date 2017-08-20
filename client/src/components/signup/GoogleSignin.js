import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = process.env.CLIENT_ID;

const responseGoogle = (response) => {
  console.log(response);
};

export default () => {
  return (
    <GoogleLogin
      clientId="790869526222-es34cktrtpdkm5kea6irs3pjp6a5u1sv.apps.googleusercontent.com"
      buttonText="Sign In with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
};
