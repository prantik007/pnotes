import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext, { AuthProvider } from './Context/AuthContext';


ReactDOM.render(
  <>
    <ColorModeScript />
    <AuthProvider><App /></AuthProvider>
    
  </>,
  document.getElementById('root')
);

