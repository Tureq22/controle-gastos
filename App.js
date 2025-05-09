import React from 'react';
import Routes from './.../navigation';
import { AuthProvider } from './.../context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}