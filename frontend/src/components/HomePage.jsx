
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
 return (
    <div className="container h-100">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="col-md-6 text-center">
          <h1>Teebay</h1>
          <p>Please sign up or log in to continue.</p>
          <div className="d-flex justify-content-center">
          <Link to="/signup" className="btn btn-primary mx-2">Sign Up</Link>
          <Link to="/login" className="btn btn-secondary">Log In</Link>
          </div>
        </div>
      </div>
    </div>
 );
};

export default HomePage;