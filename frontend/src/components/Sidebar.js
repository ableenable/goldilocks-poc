// src/components/Sidebar.js

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #cccccc;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.h1`
  font-family: 'Playfair Display', serif;
  color: #bf9000;
  margin-bottom: 40px;
  text-align: center;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 20px 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #303030;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;

  &.active {
    background-color: #bf9000;
    color: #ffffff;
    font-weight: bold;
  }

  &:hover {
    background-color: #f2f2f2;
    color: #bf9000;
  }
`;

function Sidebar() {
  return (
    <SidebarWrapper>
      <Logo>Goldilocks</Logo>
      <Menu>
        <MenuItem>
          <StyledNavLink exact to="/">
            Dashboard
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/transfer">
            Transfer
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/agent">
            AI Assistant
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/account">
            Account Information
          </StyledNavLink>
        </MenuItem>
      </Menu>
    </SidebarWrapper>
  );
}

export default Sidebar;