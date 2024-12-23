/* eslint-disable @typescript-eslint/no-explicit-any */
// FormComponent.tsx
'use client';
import React, { useState } from 'react';
import { Box, TextField, FormControlLabel, Switch, Button, Typography, Paper, Grid } from '@mui/material';
import { VehicleInspectionForm, VehicleInspectionSchema } from './types';
import { prisma } from '@/lib/prisma';
import { useSession } from 'next-auth/react';

const initialFormState: VehicleInspectionForm = {
  placa: '',
  modelo: '',
  crlvEmDia: false,
  fotoCRLV: '',
  certificadoTacografoEmDia: false,
  fotoTacografo: '',
  nivelAgua: '',
  fotoNivelAgua: '',
  nivelOleo: '',
  situacaoPneus: '',
  fotosPneusBom: '',
  motivoPneuRuim: '',
  fotosPneusRuim: '',
  pneuFurado: '',
  fotoPneuFurado: '',
  avariasCabine: false,
  descricaoAvariasCabine: '',
  fotosAvariasCabine: '',
  bauPossuiAvarias: false,
  descricaoAvariasBau: '',
  fotosAvariasBau: '',
  funcionamentoParteEletrica: false,
  motivoParteEletricaRuim: '',
  fotosParteEletricaRuim: '',
  sugestao: '',
};

export default function FormComponent() {
  const [formData, setFormData] = useState<VehicleInspectionForm>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string | any }>({});

  const { data: session } = useSession();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Reset errors

    // Validate form data
    const result = VehicleInspectionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, save to Prisma
    console.log("Form data is valid:", formData);
    // Add your submit logic here, like saving to Prisma
    await prisma.inspecao.create({ data: {...formData,userId:session?.user.id } });
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would handle file upload here
      // For now, we'll just store the file name
      setFormData(prev => ({
        ...prev,
        [fieldName]: file.name
      }));
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          Inspeção de Veículo
        </Typography>

        <Grid container spacing={3}>
          {/* Identificação do Veículo */}
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              error={!!errors.placa}
              helperText={errors.placa ? errors.placa[0] : ''}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              error={!!errors.modelo}
              helperText={errors.modelo ? errors.modelo[0] : ''}
            />
          </Grid>

          {/* CRLV */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.crlvEmDia}
                  onChange={handleChange}
                  name="crlvEmDia"
                />
              }
              label="CRLV em dia"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotoCRLV')}
              style={{ marginTop: '10px' }}
            />
          </Grid>

          {/* Tacógrafo */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.certificadoTacografoEmDia}
                  onChange={handleChange}
                  name="certificadoTacografoEmDia"
                />
              }
              label="Certificado do Tacógrafo em dia"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotoTacografo')}
              style={{ marginTop: '10px' }}
            />
          </Grid>

          {/* Nível de Água e Óleo */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nível de Água"
              name="nivelAgua"
              value={formData.nivelAgua}
              onChange={handleChange}
              error={!!errors.nivelAgua}
              helperText={errors.nivelAgua ? errors.nivelAgua[0] : ''}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotoNivelAgua')}
              style={{ marginTop: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nível de Óleo"
              name="nivelOleo"
              value={formData.nivelOleo}
              onChange={handleChange}
              error={!!errors.nivelOleo}
              helperText={errors.nivelOleo ? errors.nivelOleo[0] : ''}
            />
          </Grid>

          {/* Pneus */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Situação dos Pneus"
              name="situacaoPneus"
              value={formData.situacaoPneus}
              onChange={handleChange}
              error={!!errors.situacaoPneus}
              helperText={errors.situacaoPneus ? errors.situacaoPneus[0] : ''}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, 'fotosPneusBom')}
              style={{ marginTop: '10px' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Motivo P neu Ruim"
              name="motivoPneuRuim"
              value={formData.motivoPneuRuim}
              onChange={handleChange}
              error={!!errors.motivoPneuRuim}
              helperText={errors.motivoPneuRuim ? errors.motivoPneuRuim[0] : ''}
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, 'fotosPneusRuim')}
              style={{ marginTop: '10px' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pneu Furado"
              name="pneuFurado"
              value={formData.pneuFurado}
              onChange={handleChange}
              error={!!errors.pneuFurado}
              helperText={errors.pneuFurado ? errors.pneuFurado[0] : ''}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'fotoPneuFurado')}
              style={{ marginTop: '10px' }}
            />
          </Grid>

          {/* Avarias na Cabine */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.avariasCabine}
                  onChange={handleChange}
                  name="avariasCabine"
                />
              }
              label="Avarias na Cabine"
            />
            {formData.avariasCabine && (
              <>
                <TextField
                  fullWidth
                  label="Descrição das Avarias na Cabine"
                  name="descricaoAvariasCabine"
                  value={formData.descricaoAvariasCabine}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  sx={{ mt: 2 }}
                  error={!!errors.descricaoAvariasCabine}
                  helperText={errors.descricaoAvariasCabine ? errors.descricaoAvariasCabine[0] : ''}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'fotosAvariasCabine')}
                  style={{ marginTop: '10px' }}
                />
              </>
            )}
          </Grid>

          {/* Avarias no Baú */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.bauPossuiAvarias}
                  onChange={handleChange}
                  name="bauPossuiAvarias"
                />
              }
              label="Baú possui avarias"
            />
            {formData.bauPossuiAvarias && (
              <>
                <TextField
                  fullWidth
                  label="Descrição das Avarias no Baú"
                  name="descricaoAvariasBau"
                  value={formData.descricaoAvariasBau}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  sx={{ mt: 2 }}
                  error={!!errors.descricaoAvariasBau}
                  helperText={errors.descricaoAvariasBau ? errors.descricaoAvariasBau[0] : ''}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'fotosAvariasBau')}
                  style={{ marginTop: '10px' }}
                />
              </>
            )}
          </Grid>

          {/* Parte Elétrica */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.funcionamentoParteEletrica}
                  onChange={handleChange}
                  name="funcionamentoParteEletrica"
                />
              }
              label="Funcionamento da Parte Elétrica"
            />
            {!formData.funcionamentoParteEletrica && (
              <>
                <TextField
                  fullWidth
                  label="Motivo do Problema na Parte Elétrica"
                  name="motivoParteEletricaRuim"
                  value={formData.motivoParteEletricaRuim}
                  onChange={handleChange}
                  multiline
                  rows={1}
                  sx={{ mt: 2 }}
                  error={!!errors.motivoParteEletricaRuim}
                  helperText={errors.motivoParteEletricaRuim ? errors.motivoParteEletricaRuim[0] : ''}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, 'fotosParteEletricaRuim')}
                  style={{ marginTop: '10px' }}
                />
              </>
            )}
          </Grid>

          {/* Sugestão */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sugestão"
              name="sugestao"
              value={formData.sugestao}
              onChange={handleChange}
              multiline
              rows={4}
              error={!!errors.sugestao}
              helperText={errors.sugestao ? errors.sugestao[0] : ''}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}