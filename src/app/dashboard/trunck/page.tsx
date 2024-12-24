"use client"
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const RegisterTruck = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [placa, setLicensePlaca] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/vehicles', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ make, model, year: parseInt(year), licensePlate, placa }),
    });

    if (response.ok) {
      alert('Truck registered successfully!');
    } else {
      alert('Failed to register truck.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField sx={{mb:2}} fullWidth type="text" placeholder="Marca" value={make} onChange={(e) => setMake(e.target.value)} required />
      <TextField sx={{mb:2}} fullWidth type="text" placeholder="Modelo" value={model} onChange={(e) => setModel(e.target.value)} required />
      <TextField sx={{mb:2}} fullWidth type="number" placeholder="Ano" value={year} onChange={(e) => setYear(e.target.value)} required />
      <TextField sx={{mb:2}} fullWidth type="text" placeholder="licença da placa" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
      <TextField sx={{mb:2}} fullWidth type="text" placeholder="Placa" value={placa} onChange={(e) => setLicensePlaca(e.target.value)} required />
      <Button type="submit">Registrar</Button>
    </form>
  );
};

export default RegisterTruck;