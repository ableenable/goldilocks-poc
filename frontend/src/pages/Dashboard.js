// src/pages/Dashboard.js

import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const DashboardWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const SectionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Section = styled.div`
  background-color: #ffffff;
  padding: 30px;
  flex: 1;
  margin: 10px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border-radius: 8px;
`;

const Label = styled.h3`
  font-family: 'Playfair Display', serif;
  margin-bottom: 20px;
`;

const Value = styled.p`
  font-size: 18px;
  word-break: break-all;
`;

const CopyButton = styled.button`
  background-color: #bf9000;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;

  &:hover {
    background-color: #a67c00;
  }
`;

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/transactions/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <DashboardWrapper>
      <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Dashboard</h2>
      <SectionsRow>
        <Section>
          <Label>Wallet Address</Label>
          <Value>{user.walletAddress}</Value>
          <CopyToClipboard text={user.walletAddress} onCopy={() => setCopySuccess('Copied!')}>
            <CopyButton>Copy Address</CopyButton>
          </CopyToClipboard>
          {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}
        </Section>
        <Section>
          <Label>Wallet Balance</Label>
          <Value>{loading ? 'Loading...' : `${balance} USDC`}</Value>
        </Section>
      </SectionsRow>
    </DashboardWrapper>
  );
}

export default Dashboard;
