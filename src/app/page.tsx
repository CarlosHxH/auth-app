"use client";
import { redirect } from "next/navigation";
import React from "react";
import { session } from "@/hooks/getUsers";
import CustomFab from "@/components/CustomFab";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { Container } from "@mui/material";

export default function Home() {
  const user = async () => await session();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <ResponsiveAppBar title="5sTransportes" />
      <Container>

      </Container>
      <CustomFab href="/create" />
    </div>
  );
}
