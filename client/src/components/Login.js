import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChanges = event => {
    const newFormData = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newFormData);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/bubbles');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          username:
          <input 
            type='text'
            name='username'
            placeholder='username'
            value={form.username}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor='password'>
          password:
          <input 
            type='password'
            name='password'
            placeholder='password'
            value={form.password}
            onChange={handleChanges}
          />
        </label>
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
