"use client"
import React from 'react';
import
  {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    Chip,
    Card,
    CardContent,
    ImageList,
    ImageListItem
  } from '@mui/material';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Image from 'next/image';
import { fetcher, formatDate } from '@/lib/ultils';
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import CustomFab from '@/components/CustomFab';

interface ImageData
{
  url: string;
  title: string;
}

const StatusChip: React.FC<{ status: boolean }> = ({ status }) => (
  <Chip label={status ? "OK" : "Pendente"} color={status ? "success" : "error"} size="small" />
);

const ImageSection: React.FC<{ images: ImageData[], title: string }> = ({ images, title }) =>
{
  if (!images || images.length === 0) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>{title}</Typography>
      <ImageList sx={{ width: '100%', height: 200 }} cols={3} rowHeight={164}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <Image width={100} height={100} src={image.url} alt={image.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {children}
    </CardContent>
  </Card>
);


export default function InspectionView()
{
  const { id } = useParams<{ id: string; tag: string; item: string }>();
  const { data, error } = useSWR(`/api/inspections/${id}`, fetcher)
  const router = useRouter();
  
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Box>
      <ResponsiveAppBar title={`Inspeção - ${data.placa}`} onBackClick={() => router.push("/")} showBackButton />

      <CustomFab variant={"Edit"} href={`/inspection/${id}/edit`} />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: { xs: 2, md: 3 } }}>
          {/* Informações Básicas */}
          <Section title="Informações do Veículo">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Placa</Typography>
                <Typography variant="body1">{data.placa}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Modelo</Typography>
                <Typography variant="body1">{data.modelo}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Data da Inspeção</Typography>
                <Typography variant="body1">{formatDate(data.dataInspecao)}</Typography>
              </Grid>
            </Grid>
          </Section>

          {/* Documentação */}
          <Section title="Documentação">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2">CRLV:</Typography>
                  <StatusChip status={data.crlvEmDia} />
                </Box>
                <ImageSection images={data.fotoCRLV} title="Fotos CRLV" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2">Tacógrafo:</Typography>
                  <StatusChip status={data.certificadoTacografoEmDia} />
                </Box>
                <ImageSection images={data.fotoTacografo} title="Fotos Tacógrafo" />
              </Grid>
            </Grid>
          </Section>

          {/* Níveis */}
          <Section title="Níveis">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Nível de Água</Typography>
                <Typography variant="body1">{data.nivelAgua}</Typography>
                <ImageSection images={data.fotoNivelAgua} title="Fotos Nível de Água" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Nível de Óleo</Typography>
                <Typography variant="body1">{data.nivelOleo}</Typography>
              </Grid>
            </Grid>
          </Section>

          {/* Pneus */}
          <Section title="Pneus">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Situação dos Pneus</Typography>
                <Typography variant="body1">{data.situacaoPneus}</Typography>
                <ImageSection images={data.fotosPneusBom} title="Fotos Pneus em Bom Estado" />
              </Grid>
              {data.motivoPneuRuim && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Motivo Pneu Ruim</Typography>
                  <Typography variant="body1">{data.motivoPneuRuim}</Typography>
                  <ImageSection images={data.fotosPneusRuim} title="Fotos Pneus com Problemas" />
                </Grid>
              )}
              {data.pneuFurado && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Pneu Furado</Typography>
                  <Typography variant="body1">{data.pneuFurado}</Typography>
                  <ImageSection images={data.fotoPneuFurado} title="Fotos Pneu Furado" />
                </Grid>
              )}
            </Grid>
          </Section>

          {/* Avarias */}
          <Section title="Avarias">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2">Avarias na Cabine:</Typography>
                  <StatusChip status={!data.avariasCabine} />
                </Box>
                {data.avariasCabine && (
                  <>
                    <Typography variant="body1">{data.descricaoAvariasCabine}</Typography>
                    <ImageSection images={data.fotosAvariasCabine} title="Fotos Avarias na Cabine" />
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="subtitle2">Avarias no Baú:</Typography>
                  <StatusChip status={!data.bauPossuiAvarias} />
                </Box>
                {data.bauPossuiAvarias && (
                  <>
                    <Typography variant="body1">{data.descricaoAvariasBau}</Typography>
                    <ImageSection images={data.fotosAvariasBau} title="Fotos Avarias no Baú" />
                  </>
                )}
              </Grid>
            </Grid>
          </Section>

          {/* Parte Elétrica */}
          <Section title="Parte Elétrica">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography variant="subtitle2">Funcionamento:</Typography>
              <StatusChip status={data.funcionamentoParteEletrica} />
            </Box>
            {!data.funcionamentoParteEletrica && (
              <>
                <Typography variant="body1">{data.motivoParteEletricaRuim}</Typography>
                <ImageSection images={data.fotosParteEletricaRuim} title="Fotos Problemas Elétricos" />
              </>
            )}
          </Section>

          {/* Sugestões */}
          {data.sugestao && (
            <Section title="Sugestões">
              <Typography variant="body1">{data.sugestao}</Typography>
            </Section>
          )}
        </Paper>
      </Container>
    </Box>
  );
}