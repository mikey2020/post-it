import React from 'react';
import { Link } from 'react-router';
/**
 * Welcome component
 *
 * @description - It renders a landing page
 *
 * @returns {component} - It returns a react component
 */
export default () => (
  <div className="landing-page row">
    <div className="overlay">
      <h1 className="center welcome"> Welcome to Post It</h1>
      <p className="center welcome-message"> Get started by signing up here </p>
      <Link
        className="center btn light-blue col s4 m2 l2 push-l5 push-s5 push-m5"
        to="/signup"
      >Sign Up</Link>
    </div>
  </div>
  );

