import { Request, Response } from 'express';
import path from 'path';

export const invoice = async (_req: Request, res: Response): Promise<void> => {
  const filePath = path.join(__dirname, '..', 'docs', 'Factura_cargo_fijo.docx');

  res.download(filePath);
};

export const informeRadicado = async (_req: Request, res: Response): Promise<void> => {
  const filePath = path.join(__dirname, '..', 'docs', 'Informe_radiacion.docx');

  res.download(filePath);
};
