"use client";
import useSWR from "swr";
import React from "react";
import { fetcher } from "@/lib/ultils";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import ButtonLabel from "@/components/ButtonLabel";
import { TextField, Button, Grid, Typography, Paper, Divider } from "@mui/material";
import { useForm, Form } from "react-hook-form";
import { useRouter } from "next/navigation";
import { InspectionFormData } from "@/types/InspectionSchema";
import { EixoSection, Vehicle } from "@/components/EixoSection";

interface Data {
  vehicleId: string;
  user: {
    id: string;
  }
  vehicle: Vehicle;
}

const InspectionForm: React.FC<{id:string}> = ({id}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data, isLoading } = useSWR<Data, { [key: string]: any }>(`/api/inspect/${id}`, fetcher);
  const { register, watch, reset, setValue, control, formState: { errors, isSubmitting } } = useForm<InspectionFormData>({});

  React.useEffect(() => {
    const defaultValues: Partial<InspectionFormData> = {};
    defaultValues.id = id;
    defaultValues.userId = session?.user?.id;
    defaultValues.vehicleId = data?.vehicleId;
    defaultValues.status = 'FINAL';
    defaultValues.eixo = data?.vehicle?.eixo ?? "0";
    defaultValues.isFinished = true;
    reset({ ...defaultValues });
  }, [data, id, reset, session?.user?.id]);

  if (isLoading) return <Loading />;

  const selectedVehicle = data?.vehicle;

  // Watch values for conditional fields
  const avariasCabine = watch("avariasCabine");
  const bauPossuiAvarias = watch("bauPossuiAvarias");
  const funcionamentoParteEletrica = watch("funcionamentoParteEletrica");
  if (avariasCabine === "SIM") setValue("descricaoAvariasCabine", "");
  if (bauPossuiAvarias === "SIM") setValue("descricaoAvariasBau", "");
  if (funcionamentoParteEletrica === "BOM") setValue("descricaoParteEletrica", "");

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      {isSubmitting && <Loading />}
      <Form
        method="post"
        encType={'application/json'}
        action={"/api/inspections"}
        onSuccess={async ({ response }) => {
          router.push(`/`);
        }}
        onError={async (error) => {
          alert("Erro ao enviar os dados!");
          if (error.response) {
            const res = await error.response.json();
            console.log(res);
            alert("Error ao criar a inspeção!")
          } else {
            console.log(error);
          }
         }}
        control={control}
      >
        <Typography variant="h4" gutterBottom>Criar inspeção</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}><Divider>Dados do usuário</Divider></Grid>

          <Grid item xs={12}>
            <ButtonLabel disabled label="Viagem" name="status" options={["INICIO", "FINAL"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField disabled value={`${data?.vehicle?.plate} - ${data?.vehicle?.model}`} fullWidth size="small" label="Selecione um veículo" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField {...register("kilometer", { required: "Este campo é obrigatório" })} fullWidth size="small" label="Quilometragem:" />
          </Grid>

          <Grid item xs={12}><Divider>Documentos</Divider></Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="CRLV em dia?" name="crlvEmDia" options={["SIM", "NÃO"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="Cert. Tacografo em Dia?" name="certificadoTacografoEmDia" options={["SIM", "NÃO"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
          </Grid>

          <Grid item xs={12}><Divider>Níveis</Divider></Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="Nível Água" name="nivelAgua" control={control} options={["NORMAL", "BAIXO", "CRITICO"]} rules={{ required: "Este campo é obrigatório" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="Nível Óleo" name="nivelOleo" options={["NORMAL", "BAIXO", "CRITICO"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
          </Grid>

          {selectedVehicle && (
            <>
              <Grid item xs={12}><Divider>Situação dos Pneus</Divider></Grid>
              <EixoSection eixoNumber={1} label="DIANTEIRA" fieldName="dianteira" selectedVehicle={selectedVehicle} control={control} register={register} watch={watch} setValue={setValue} />
              <EixoSection eixoNumber={2} label="TRAÇÃO" fieldName="tracao" selectedVehicle={selectedVehicle} control={control} register={register} watch={watch} setValue={setValue} />
              <EixoSection eixoNumber={3} label="TRUCK" fieldName="truck" selectedVehicle={selectedVehicle} control={control} register={register} watch={watch} setValue={setValue} />
              <EixoSection eixoNumber={4} label="QUARTO EIXO" fieldName="quartoEixo" selectedVehicle={selectedVehicle} control={control} register={register} watch={watch} setValue={setValue} />
            </>
          )}

          <Grid item xs={12}><Divider>Avarias</Divider></Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="Avarias na Cabine" name="avariasCabine" options={["NÃO", "SIM"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
            {watch("avariasCabine") === "SIM" && (
              <TextField {...register("descricaoAvariasCabine",{ required: "Este campo é obrigatório" })} label="Qual avaria?" error={!!errors.descricaoAvariasCabine} multiline fullWidth rows={2} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <ButtonLabel label="Avarias no Baú" name="bauPossuiAvarias" options={["NÃO", "SIM"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
            {watch("bauPossuiAvarias") === "SIM" && (
              <TextField {...register("descricaoAvariasBau",{ required: "Este campo é obrigatório" })} label="Qual defeito?" error={!!errors.descricaoAvariasBau} multiline fullWidth rows={2} />
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider>Elétrica</Divider>
            <ButtonLabel label="Parte Elétrica" name="funcionamentoParteEletrica" options={["BOM", "RUIM"]} control={control} rules={{ required: "Este campo é obrigatório" }} />
            {watch("funcionamentoParteEletrica") === "RUIM" && (
              <TextField {...register("descricaoParteEletrica",{ required: "Este campo é obrigatório" })} label="Qual defeito?" error={!!errors.descricaoParteEletrica} multiline fullWidth rows={2} />
            )}
          </Grid>

          <Grid item xs={12}>
            {Object.keys(errors).length > 0 && (
              <Typography color="error" align="center" gutterBottom>
                {errors.root?.message || "Existem campos obrigatórios não preenchidos!"}
              </Typography>
            )}
            <Button fullWidth type="submit" variant="contained" color="primary">Salvar</Button>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};
export default InspectionForm;