// types.ts
import { z } from 'zod';

export const VehicleInspectionSchema = z.object({
  placa: z.string().min(1, "Placa é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  crlvEmDia: z.boolean(),
  fotoCRLV: z.string().optional(),
  certificadoTacografoEmDia: z.boolean(),
  fotoTacografo: z.string().optional(),
  nivelAgua: z.string().optional(),
  fotoNivelAgua: z.string().optional(),
  nivelOleo: z.string().optional(),
  situacaoPneus: z.string().optional(),
  fotosPneusBom: z.string().optional(),
  motivoPneuRuim: z.string().optional(),
  fotosPneusRuim: z.string().optional(),
  pneuFurado: z.string().optional(),
  fotoPneuFurado: z.string().optional(),
  avariasCabine: z.boolean(),
  descricaoAvariasCabine: z.string().optional(),
  fotosAvariasCabine: z.string().optional(),
  bauPossuiAvarias: z.boolean(),
  descricaoAvariasBau: z.string().optional(),
  fotosAvariasBau: z.string().optional(),
  funcionamentoParteEletrica: z.boolean(),
  motivoParteEletricaRuim: z.string().optional(),
  fotosParteEletricaRuim: z.string().optional(),
  sugestao: z.string().optional(),
});

export type VehicleInspectionForm = z.infer<typeof VehicleInspectionSchema>;

export const initialFormState: VehicleInspectionForm = {
  placa: "",
  modelo: "",
  crlvEmDia: false,
  fotoCRLV: "",
  certificadoTacografoEmDia: false,
  fotoTacografo: "",
  nivelAgua: "",
  fotoNivelAgua: "",
  nivelOleo: "",
  situacaoPneus: "",
  fotosPneusBom: "",
  motivoPneuRuim: "",
  fotosPneusRuim: "",
  pneuFurado: "",
  fotoPneuFurado: "",
  avariasCabine: false,
  descricaoAvariasCabine: "",
  fotosAvariasCabine: "",
  bauPossuiAvarias: false,
  descricaoAvariasBau: "",
  fotosAvariasBau: "",
  funcionamentoParteEletrica: false,
  motivoParteEletricaRuim: "",
  fotosParteEletricaRuim: "",
  sugestao: "",
};


/*export interface VehicleInspectionForm {
    placa: string;
    modelo: string;
    crlvEmDia: boolean;
    fotoCRLV: string;
    certificadoTacografoEmDia: boolean;
    fotoTacografo: string;
    nivelAgua: string;
    fotoNivelAgua: string;
    nivelOleo: string;
    situacaoPneus: string;
    fotosPneusBom: string;
    motivoPneuRuim: string;
    fotosPneusRuim: string;
    pneuFurado: string;
    fotoPneuFurado: string;
    avariasCabine: boolean;
    descricaoAvariasCabine: string;
    fotosAvariasCabine: string;
    bauPossuiAvarias: boolean;
    descricaoAvariasBau: string;
    fotosAvariasBau: string;
    funcionamentoParteEletrica: boolean;
    motivoParteEletricaRuim: string;
    fotosParteEletricaRuim: string;
    sugestao: string;
  }*/