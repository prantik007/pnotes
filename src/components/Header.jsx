import {
  Flex,
  Heading,
  Box,
  HStack,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';

import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useAuth, logout } from './../Context/AuthContext';

const NavLinkItem = props => {
  return (
    <Text fontSize="2xl" _hover={{ color: 'teal.300', cursor: 'pointer' }}>
      {props.text}
    </Text>
  );
};

const Header = () => {
  const user = useAuth();
  let navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Flex justify="space-around" align="center" h="28">
        <Box d="flex" alignItems="center">
          <Heading fontSize="7xl" color="green.400">
            P
          </Heading>
          <Heading fontWeight="light" fontSize="5xl">
            -Notes{' '}
          </Heading>
        </Box>

        <HStack spacing="6">
          <ColorModeSwitcher />
          <Link to="/">
            <NavLinkItem text="Home" />
          </Link>

          {user && (
            <Link to="/dashboard">
              <NavLinkItem text="Dashboard" />
            </Link>
          )}
          
          {!user && (
            <Link to="/login">
              <NavLinkItem text="Login" />
            </Link>
          )}

          {!user && (
            <Link to="/signup">
              <NavLinkItem text="Signup" />
            </Link>
          )}

          <NavLinkItem text="About" />
          {user && (
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </HStack>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
