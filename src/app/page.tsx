"use client";
import React from "react";
import CustomFab from "@/components/CustomFab";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import VehicleInspectionList from "@/components/VehicleInspectionList";
import useSWR from "swr";
import { fetcher } from "@/lib/ultils";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/inspections', fetcher);
  
  const router = useRouter();
  
  const handleView = (id: string) => router.push(`/inspection/${id}`);
  const handleEdit = (id: string) => router.push(`/inspection/${id}/edit`);
  
  if(isLoading || error) return <Loading/>
  
  return (
    <div>
      <ResponsiveAppBar title="5sTransportes" />
      {(data.length>0)&&<VehicleInspectionList inspections={data} onEdit={handleEdit} onView={handleView} />}
      <CustomFab href={'/inspection/create'} variant={"Plus"} />
    </div>
  );
}
