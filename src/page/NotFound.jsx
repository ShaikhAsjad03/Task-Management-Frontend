import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card shadow-lg border-0 rounded-4 p-4">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Oops! The page you are looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
