import React from "react";
import { Box, Card, CardContent, Typography, Chip, Grid, IconButton, List, ListItem, Divider } from "@mui/material";
import { Edit as EditIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { formatDate } from "@/lib/ultils";

interface Props {
  inspections: VehicleInspection[];
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}
interface VehicleInspection {
  id: string;
  licensePlate: string;
  model: string;
  crlvEmDia: boolean;
  certificadoTacografoEmDia: boolean;
  avariasCabine: boolean;
  bauPossuiAvarias: boolean;
  funcionamentoParteEletrica: boolean;
  dataInspecao: string;
  vehicle :{
    licensePlate: string;
    model: string;
  }
}

export default function VehicleInspectionList({inspections, onEdit, onView }: Props) {
  console.log(inspections);
  
  const getStatusChip = (status: boolean) => (
    <Chip label={status ? "OK" : "Pendente"} color={status ? "success" : "error"} size="small" />
  );

  return (
    <List>
      {inspections.map((inspection, index) => (
        <React.Fragment key={inspection.id}>
          <ListItem sx={{py:2,px:{xs:1,sm:2},bgcolor: "background.paper"}}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Grid container spacing={2}>
                  {/* Main Info */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      {inspection.vehicle.licensePlate} - {inspection.vehicle.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data da Inspeção: {formatDate(inspection.dataInspecao)}
                    </Typography>
                  </Grid>

                  {/* Status Indicators */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 120 }}>
                          CRLV:
                        </Typography>
                        {getStatusChip(inspection.crlvEmDia)}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 120 }}>
                          Tacógrafo:
                        </Typography>
                        {getStatusChip(inspection.certificadoTacografoEmDia)}
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 120 }}>
                          Parte Elétrica:
                        </Typography>
                        {getStatusChip(inspection.funcionamentoParteEletrica)}
                      </Box>
                    </Box>
                  </Grid>

                  {/* Actions */}
                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    {onView && (
                      <IconButton onClick={() => onView(inspection.id)} color="primary">
                        <ViewIcon />
                      </IconButton>
                    )}
                    {onEdit && (
                      <IconButton onClick={() => onEdit(inspection.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ListItem>
          {index < inspections.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}
