// src/pages/Transfer.js

import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const TransferWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  margin-bottom: 30px;
  color: #bf9000;
`;

const Form = styled.form`
  background-color: #ffffff;
  padding: 30px 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 20px 30px;
    width: 90%;
  }
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

function Transfer() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!recipientAddress || !amount) {
      setMessage('Please fill in all fields.');
      setStatus('error');
      return;
    }

    // Validate Ethereum address
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(recipientAddress);
    if (!isValidAddress) {
      setMessage('Invalid Ethereum address.');
      setStatus('error');
      return;
    }

    // Validate amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await api.post('/api/transactions/send', {
        recipientAddress,
        amount,
      });
      setStatus('success');
      setMessage('Transaction successful!');
      // Optionally, clear the form
      setRecipientAddress('');
      setAmount('');
      return response.data;
    } catch (error) {
      console.error('Error sending USDC:', error);
      setStatus('error');
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('An error occurred during the transaction.');
      }
    }
  };

  return (
    <TransferWrapper>
      <Title>Send USDC</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          required
          placeholder="Enter recipient's Ethereum address"
        />
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Enter amount to send"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Transferring...' : 'Send USDC'}
        </Button>
        {message && <Message success={status === 'success'}>{message}</Message>}
      </Form>
    </TransferWrapper>
  );
}

export default Transfer;