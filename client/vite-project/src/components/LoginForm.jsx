import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
        console.log('Login successful:', email);
      } else {
        if (!name || !email || !password) {
          console.error('All fields are required for signup');
          return;
        }
        await register(name, email, password);
        console.log('Signup successful:', email);
      }
      navigate('/dashboard');
    } catch (err) {
      // Log full error object for debugging
      console.error('Error during auth:', err);

      // Optional: Show user-friendly message on UI here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm p-6 rounded shadow-lg bg-white w-full mx-4">
        <h2 className="text-2xl text-blue-600 text-center font-bold mb-6">
          {isLogin ? 'Login' : 'Signup'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="border-[0.5px]  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 mb-4 w-full rounded"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border-[0.5px]  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 mb-4 w-full rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border-[0.5px]  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 p-2 mb-6 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            {isLogin ? 'Signup here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
