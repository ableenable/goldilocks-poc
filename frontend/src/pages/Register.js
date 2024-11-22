// src/pages/Register.js

import React, { useState, useContext } from 'react';
import api from '../utils/api';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const RegisterBox = styled.div`
  background-color: #ffffff;
  padding: 40px 60px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-radius: 12px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px 30px;
    width: 90%;
  }
`;

const Logo = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #bf9000;
  margin-bottom: 30px;
`;

const Form = styled.form`
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    border-color: #bf9000;
    outline: none;
    box-shadow: 0 0 5px rgba(191, 144, 0, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 14px;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a67c00;
  }

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 20px;
`;

const LoginLink = styled.p`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;

  a {
    color: #bf9000;
    text-decoration: underline;

    &:hover {
      color: #a67c00;
    }
  }
`;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', { email, password });
      localStorage.setItem('token', response.data.token);
      login(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Logo>Goldilocks</Logo>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="email">Email:</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <Label htmlFor="password">Password:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Register</Button>
        </Form>
        <LoginLink>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginLink>
      </RegisterBox>
    </Container>
  );
}

export default Register;