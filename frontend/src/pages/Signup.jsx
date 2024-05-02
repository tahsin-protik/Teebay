// src/components/SignUp.js

import React, { useState } from 'react';
import { SIGNUP_MUTATION } from '../services/graphql/mutations';
import { useMutation } from '@apollo/client';
import client from '../services/graphql/apolloClient';

export default function SignUp() {
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [address, setAddress] = useState('');
 const [email, setEmail] = useState('');
 const [phone, setPhone] = useState('');
 const [password, setPassword] = useState('');
 const [signUp, { loading, error }] = useMutation(SIGNUP_MUTATION, { client });

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUp({
        variables: { firstName, lastName, address, email, phone, password },
      });
      localStorage.setItem('auth_token', data.signup.token);
      localStorage.setItem('name', data.signup.user.first_name);
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
              <h3 className="card-title text-center">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                 <label>First Name</label>
                 <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Last Name</label>
                 <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Address</label>
                 <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Email</label>
                 <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Phone</label>
                 <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                 />
                </div>
                <div className="form-group mt-3">
                 <label>Password</label>
                 <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                </div>
                <div className="d-grid gap-2 mt-3">
                 <button type="submit" className="btn btn-primary">
                    Sign Up
                 </button>
                </div>
                <p className="forgot-password text-right mt-2">
                 Already registered <a href="/login">Login?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}
