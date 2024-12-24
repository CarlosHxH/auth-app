/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import {
  initialFormState,
  VehicleInspectionForm,
  VehicleInspectionSchema,
} from "./types";
import { useSession } from "next-auth/react";
import FileUpload from "@/components/FileUpload";
import BottonLabel from "@/components/BottonLabel";
import CustomAutocomplete from "@/components/CustomAutocomplete";

export default function FormComponent() {
  const [formData, setFormData] =
    useState<VehicleInspectionForm>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string | any }>({});

  const handleToggle = (event: { [key: string]: any }) => {
    setFormData((prev) => ({ ...prev, ...event }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({}); // Redefinir erros

    // Validar dados de formulário
    const result = VehicleInspectionSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      const data = {
        data: {
          userId: session?.user.id,
          placa: formData.placa,
          modelo: formData.modelo,
          dataInspecao: new Date(),
          crlvEmDia: formData.crlvEmDia,
          fotoCRLV: JSON.stringify(formData.fotoCRLV),
          certificadoTacografoEmDia: formData.certificadoTacografoEmDia,
          fotoTacografo: JSON.stringify(formData.fotoTacografo),
          nivelAgua: JSON.stringify(formData.nivelAgua),
          fotoNivelAgua: JSON.stringify(formData.fotoNivelAgua),
          nivelOleo: JSON.stringify(formData.nivelOleo),
          situacaoPneus: JSON.stringify(formData.situacaoPneus),
          fotosPneusBom: JSON.stringify(formData.fotosPneusBom),
          motivoPneuRuim: JSON.stringify(formData.motivoPneuRuim),
          fotosPneusRuim: JSON.stringify(formData.fotosPneusRuim),
          pneuFurado: JSON.stringify(formData.pneuFurado),
          fotoPneuFurado: JSON.stringify(formData.fotoPneuFurado),
          avariasCabine: formData.avariasCabine,
          descricaoAvariasCabine: JSON.stringify(
            formData.descricaoAvariasCabine
          ),
          fotosAvariasCabine: JSON.stringify(formData.fotosAvariasCabine),
          bauPossuiAvarias: formData.bauPossuiAvarias,
          descricaoAvariasBau: JSON.stringify(formData.descricaoAvariasBau),
          fotosAvariasBau: JSON.stringify(formData.fotosAvariasBau),
          funcionamentoParteEletrica: formData.funcionamentoParteEletrica,
          motivoParteEletricaRuim: JSON.stringify(
            formData.motivoParteEletricaRuim
          ),
          fotosParteEletricaRuim: JSON.stringify(
            formData.fotosParteEletricaRuim
          ),
          sugestao: JSON.stringify(formData.sugestao),
        },
      };
      console.log("Inspeção salva com sucesso!", data);
    } catch (error) {
      console.error("Erro ao salvar inspeção:", error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          Inspeção de Veículo
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomAutocomplete label={"Placa"} onSelect={handleToggle} options={[{ label: "placa9876" }, { label: "placa1234" }]} name={"placa"} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required fullWidth
              label="Modelo"
              name="modelo"
              sx={{ mb: 2 }}
              value={formData.modelo}
              onChange={handleChange}
              error={!!errors.modelo}
              helperText={errors.modelo ? errors.modelo[0] : ""}
            />
          </Grid>

          {/* CRLV */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData?.crlvEmDia || false}
                  onChange={handleChange}
                  name="crlvEmDia"
                />
              }
              label="CRLV em dia"
            />
            <FileUpload
              label="Foto do CRLV em dia"
              multiple={true}
              name={"fotoCRLV"}
              onChange={handleToggle}
            />
          </Grid>

          {/* Tacógrafo */}
          <Grid item xs={12} md={6}>
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
            <FileUpload
              label="Foto do Certificado do Tacógrafo em dia"
              name={"fotoTacografo"}
              onChange={handleToggle}
            />
          </Grid>

          {/* Nível de Água e Óleo */}
          <Grid item xs={12} md={6}>
            <BottonLabel
              title={"Nível de Água"}
              name={"nivelAgua"}
              values={["Normal", "Baixo", "Critico"]}
              onChange={handleToggle}
            />
            <FileUpload
              label={"Foto do Nível de Água"}
              name={"fotoNivelAgua"}
              onChange={handleToggle}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BottonLabel
              title={"Nível de Óleo"}
              name={"nivelOleo"}
              values={["Normal", "Baixo", "Critico"]}
              onChange={handleToggle}
            />
          </Grid>

          {/* Pneus */}
          <Grid item xs={12}>
            <BottonLabel
              title={"Situação dos Pneus"}
              name={"situacaoPneus"}
              values={["Bom", "Ruim"]}
              onChange={handleToggle}
            />
            <FileUpload
              label="Foto da Situação dos Pneus"
              name={"fotosPneus"}
              onChange={handleToggle}
            />
            {formData.situacaoPneus === "Ruim" && (
              <TextField
                fullWidth
                label="Motivo Pneu Ruim"
                name="motivoPneuRuim"
                sx={{ my: 2 }}
                value={formData.motivoPneuRuim}
                onChange={handleChange}
                error={!!errors.motivoPneuRuim}
                helperText={
                  errors.motivoPneuRuim ? errors.motivoPneuRuim[0] : ""
                }
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pneu Furado"
              name="pneuFurado"
              sx={{ my: 2 }}
              value={formData.pneuFurado}
              onChange={handleChange}
              error={!!errors.pneuFurado}
              helperText={errors.pneuFurado ? errors.pneuFurado[0] : ""}
            />
            <FileUpload label="Foto do Pneu Furado" name={"fotoPneuFurado"} onChange={handleToggle} />
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
                  rows={2}
                  sx={{ my: 2 }}
                  error={!!errors.descricaoAvariasCabine}
                  helperText={
                    errors.descricaoAvariasCabine
                      ? errors.descricaoAvariasCabine[0]
                      : ""
                  }
                />
                <FileUpload
                  name={"fotosAvariasCabine"}
                  onChange={handleToggle}
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
                  sx={{ my: 2 }}
                  error={!!errors.descricaoAvariasBau}
                  helperText={
                    errors.descricaoAvariasBau
                      ? errors.descricaoAvariasBau[0]
                      : ""
                  }
                />
                <FileUpload name={"fotosAvariasBau"} onChange={handleToggle} />
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
            {formData.funcionamentoParteEletrica && (
              <>
                <TextField
                  fullWidth
                  label="Motivo do Problema na Parte Elétrica"
                  name="motivoParteEletricaRuim"
                  value={formData.motivoParteEletricaRuim}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  sx={{ my: 2 }}
                  error={!!errors.motivoParteEletricaRuim}
                  helperText={
                    errors.motivoParteEletricaRuim
                      ? errors.motivoParteEletricaRuim[0]
                      : ""
                  }
                />
                <FileUpload
                  label={"Fotos da parte eletrica ruim"}
                  name={"fotosParteEletricaRuim"}
                  onChange={handleToggle}
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
              helperText={errors.sugestao ? errors.sugestao[0] : ""}
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
