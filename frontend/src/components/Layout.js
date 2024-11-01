// src/components/Layout.js

import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 250px; /* Width of the sidebar */
  padding: 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Sidebar />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
}

export default Layout;
