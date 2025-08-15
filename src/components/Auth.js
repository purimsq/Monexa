import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return isLogin ? (
    <Login onSwitchToSignup={switchToSignup} />
  ) : (
    <Signup onSwitchToLogin={switchToLogin} />
  );
};

export default Auth;
