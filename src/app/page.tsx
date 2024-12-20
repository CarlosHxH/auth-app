"use client";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { session } from "@/hooks/getUsers";
import CustomFab from "@/components/CustomFab";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import VehicleInspectionList from "./VehicleInspectionList";
import { Toolbar } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const user = async () => await session();
  if (!user) redirect("/api/auth/signin");

  const inspections = [
    {
      id: "1",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },{
      id: "2",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },{
      id: "3",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },{
      id: "4",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },{
      id: "5",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },{
      id: "6",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    }
  ];

  const handleEdit = (id: string) => {
    router.push(`/inspection/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/inspection/${id}`);
  };

  return (
    <div>
      <ResponsiveAppBar title="5sTransportes" />
      <Toolbar/>
      <VehicleInspectionList inspections={inspections} onEdit={handleEdit} onView={handleView} />
      <CustomFab href="/create" />
    </div>
  );
}
