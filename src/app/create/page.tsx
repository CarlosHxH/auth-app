"use client"
import React from 'react';
import Form from './Form';
import { Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Form />
    </Container>
  );
};

export default Home;