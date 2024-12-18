// components/Form.tsx
import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import UseAutocomplete from "@/components/CustomSelect";

const data = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
];

const Form: React.FC = () => {
  return (
    <form>
      <Typography variant="h4" gutterBottom>
        Formulário de Inspeção do Veículo
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UseAutocomplete data={data} label="Placa" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Modelo" variant="outlined" required />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label="CRLV está em dia?" />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Certificado Tacógrafo está em dia?"
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Nível Água" variant="outlined" required />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Nível Óleo" variant="outlined" required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Situação Pneus"
            variant="outlined"
            required
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Por que o pneu está ruim?"
            variant="outlined"
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Qual pneu furado?" variant="outlined" />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label="Avarias na cabine?" />
          <TextField
            fullWidth
            label="Descreva avarias na cabine"
            variant="outlined"
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Baú possui avarias?"
          />
          <TextField
            fullWidth
            label="Descrição das avarias no Baú"
            variant="outlined"
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Funcionamento da parte elétrica?"
          />
          <TextField
            fullWidth
            label="Por que a parte elétrica está ruim?"
            variant="outlined"
          />
          <input type="file" accept="image/*" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Sugestão" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
