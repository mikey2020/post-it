import React from 'react';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
};

class GoogleSignin extends React.Component {
  render(){
      return (
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        >
        </GoogleLogin>
      );
  }

}

export default GoogleSignin;
