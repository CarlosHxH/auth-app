export interface VehicleInspectionForm {
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
  }