"use client";
import React from "react";
import FormControl from "@mui/material/FormControl";
import Label from "@mui/icons-material/Label";
import { HelperText, StyledInput } from "@/components/CustomStyled";
import { Container } from "@mui/material";

export default function Page() {
  const Input = ({label,placeholder}:{label:string,placeholder:string}) => (
    <FormControl defaultValue={""} required>
      <Label>{label}</Label>
      <StyledInput placeholder={placeholder} />
      <HelperText />
    </FormControl>
  );
  return (
    <React.Fragment>
      <Container sx={{ mb: 5 }}>
        <Input label={"Qual pneu furado?"} placeholder={""}/>
        <Input label={""} placeholder={""}/>
        <Input label={""} placeholder={""}/>
        <Input label={""} placeholder={""}/>
        <Input label={""} placeholder={""}/>
        <Input label={""} placeholder={""}/>
        <Input label={""} placeholder={""}/>
      </Container>
    </React.Fragment>
  );
}
