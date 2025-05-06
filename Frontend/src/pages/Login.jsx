import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/Shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-8">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-4">
            <p className="text-3xl font-semibold text-black">{currentState}</p>
          </div>

          {currentState === 'Sign Up' && (
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Name"
              required
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Email"
            required
          />

          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-between text-sm text-gray-600">
            <p className="hover:underline cursor-pointer">Forgot your password?</p>
            {currentState === 'Login' ? (
              <p
                onClick={() => setCurrentState('Sign Up')}
                className="cursor-pointer hover:underline"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState('Login')}
                className="cursor-pointer hover:underline"
              >
                Login here
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full font-medium py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 mt-2"
          >
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
