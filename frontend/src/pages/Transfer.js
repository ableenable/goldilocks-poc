// src/pages/Transfer.js

import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

const TransferWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const Form = styled.form`
  background-color: #ffffff;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 8px;
  max-width: 600px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-family: 'Playfair Display', serif;
`;

const Input = styled.input`
  width: calc(100% - 24px); /* Ensure equal padding on both sides */
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const Button = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 14px 20px;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;

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

    // Optionally, validate the recipient address format
    const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(recipientAddress);
    if (!isValidAddress) {
      setMessage('Invalid Ethereum address.');
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
      // Optionally, you can clear the form
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
      <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Transfer USDC</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Recipient Address</Label>
        <Input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          required
        />
        <Label>Amount</Label>
        <Input
          type="number"
          step="0.000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Transferring...' : 'Send USDC'}
        </Button>
      </Form>
      {message && (
        <Message style={{ color: status === 'success' ? 'green' : 'red' }}>
          {message}
        </Message>
      )}
    </TransferWrapper>
  );
}

export default Transfer;
