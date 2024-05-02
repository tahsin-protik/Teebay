import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../services/graphql/mutations';
import client from '../services/graphql/apolloClient';


export default function LoginPage() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [login, { loading, error }] = useMutation(LOGIN_MUTATION, { client });

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      console.log(data);
      localStorage.setItem('auth_token', data.login.token);
      localStorage.setItem('name', data.login.user.first_name);
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
    }
 };

 return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign In</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                 <label>Email address</label>
                 <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Password</label>
                 <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
                <div className="d-grid gap-2 mt-3">
                 <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                 </button>
                </div>
                {error && <p className="text-danger">{error.message}</p>}
              </form>
            </div>
            <p className="forgot-password text-right mt-2">
                 Not Registered? <a href="/signup">Signup?</a>
                </p>
          </div>
        </div>
      </div>
    </div>
 );
}