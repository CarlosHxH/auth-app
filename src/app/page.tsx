"use client";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import React from "react";
import { session } from "@/hooks/getUsers";
import CustomFab from "@/components/CustomFab";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";

export default function Home() {
  const user = async () => await session();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <Container>
      <ResponsiveAppBar title={"5sTransportes"}/>
      <CustomFab href="/create" />
    </Container>
  );
}
