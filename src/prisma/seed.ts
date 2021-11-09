import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.documentosTramite.createMany({
    data: [
      { id: 1, nombre: 'Formulario único nacional  para solicitud de licencia' },
      { id: 2, nombre: 'Copia del certificado de libertad' },
      { id: 3, nombre: 'Copia del documento de identidad del solicitante' },
      { id: 4, nombre: 'Poder de autorización debidamente diligenciado' },
      { id: 5, nombre: 'Copia del impuesto predial' },
      { id: 6, nombre: 'Copia de servicios Publicos' },
      { id: 7, nombre: '3 Copias  de diseño estructural' },
      { id: 8, nombre: '2 Copias de las memorias de calculos' },
      { id: 9, nombre: '2 Copias de estudio de suelo' },
      { id: 10, nombre: 'Estudio de suelo' },
      { id: 11, nombre: 'Propuesta estructural' },
      { id: 12, nombre: 'Planos y diseño' },
      { id: 13, nombre: 'Certificado estructural' },
      { id: 14, nombre: 'Evaluación de la estructura existente' },
      { id: 15, nombre: 'Memoria de calculo' },
      { id: 16, nombre: 'Peritaje Tecnico' },
      { id: 17, nombre: 'Vecinos colindantes' },
    ],
  });
  await prisma.estadoRadicado.createMany({
    data: [
      { id: 1, nombre: 'Radicado' },
      { id: 2, nombre: 'En revision Preliminar' },
      { id: 3, nombre: 'Aceptado' },
      { id: 4, nombre: 'En revision juridica' },
      { id: 5, nombre: 'En revision Arquitectonica' },
      { id: 6, nombre: 'En revision Estructural' },
      { id: 7, nombre: 'En tramite de licenciá' },
      { id: 8, nombre: 'Licencia expedida' },
    ],
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
