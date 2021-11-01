import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // await prisma.ponderante.createMany({
  //   data: [
  //     { nombre: 'Institucional: Entre 1 y 300' },
  //     { nombre: 'Institucional: Entre 301 y 1000' },
  //     { nombre: 'Institucional: Mayor a 1001' },
  //     { nombre: 'Comercial: Entre 1 y 300' },
  //     { nombre: 'Comercial: Entre 301 y 1000' },
  //     { nombre: 'Comercial: Mayor a 1001' },
  //     { nombre: 'Industrial: Entre 1 y 300' },
  //     { nombre: 'Industrial: Entre 301 y 1000' },
  //     { nombre: 'Industrial: Mayor a 1001' },
  //     { nombre: 'Aprobacion planos para propiedad horizontal entre 1 y 250 (est. N/A)' },
  //     {
  //       nombre: 'Aprobacion planos para propiedad horizontal entre 251 y 500 (est. N/A) ',
  //     },
  //     {
  //       nombre: 'Aprobacion planos para propiedad horizontal entre 501 y 1000 (est. N/A)',
  //     },
  //     {
  //       nombre:
  //         'Aprobacion planos para propiedad horizontal entre 1001 y 5000 (est. N/A)',
  //     },
  //     {
  //       nombre:
  //         'Aprobacion planos para propiedad horizontal entre 5001 y 10000 (est. N/A)',
  //     },
  //     {
  //       nombre:
  //         'Aprobacion planos para propiedad horizontal entre 10001 y 20000 (est. N/A)',
  //     },
  //     { nombre: 'Aprobacion planos para propiedad horizontal mayor a 20000 (est. N/A)' },
  //     { nombre: 'Ajuste de cotas (est. 1)' },
  //     { nombre: 'Ajuste de cotas (est. 2)' },
  //     { nombre: 'Ajuste de cotas (est. 3)' },
  //     { nombre: 'Ajuste de cotas (est. 4)' },
  //     { nombre: 'Ajuste de cotas (est. 5)' },
  //     { nombre: 'Ajuste de cotas (est. 6)' },
  //     { nombre: 'Copia certificada de planos (est. N/A)' },
  //     { nombre: 'Concepto uso de suelos (est. N/A)' },
  //     { nombre: 'Concepto de norma urbanistica (est. N/A)' },
  //     { nombre: 'Prorroga de licencia (est. N/A)' },
  //     { nombre: 'Subdivision urbana (est. N/A)' },
  //     { nombre: 'Re-loteo entre 1 y 1000 (est. N/A)' },
  //     { nombre: 'Re-loteo entre 1001 y 5000 (est. N/A)' },
  //     { nombre: 'Re-loteo entre 5001 y 10000 (est. N/A)' },
  //     { nombre: 'Re-loteo entre 10001 y 20000 (est. N/A)' },
  //     { nombre: 'Re-loteo mayor a 20000 (est. N/A)' },
  //     { nombre: 'PUG x c/5000 m2 10 smmlvd maximo 150 smmlvd o 5 smmlv (est. N/A)' },
  //     { nombre: 'Movimiento de tierra entre 1 y 100' },
  //     { nombre: 'Movimiento de tierra entre 101 y 500' },
  //     { nombre: 'Movimiento de tierra entre 501 y 1000' },
  //     { nombre: 'Movimiento de tierra entre 1001 y 5000' },
  //     { nombre: 'Movimiento de tierra entre 5001 y 10000' },
  //     { nombre: 'Movimiento de tierra entre 10001 y 20000' },
  //     { nombre: 'Movimiento de tierra mayor a 20001' },
  //     { nombre: 'Vivienda estrato 1' },
  //     { nombre: 'Vivienda estrato 2' },
  //     { nombre: 'Vivienda estrato 3' },
  //     { nombre: 'Vivienda estrato 4' },
  //     { nombre: 'Vivienda estrato 5' },
  //     { nombre: 'Vivienda estrato 6' },
  //   ],
  // });
  // await prisma.role.createMany({
  //   data: [{ tipo: 'propietario' }, { tipo: 'tramitador ' }, { tipo: 'usuario' }],
  // });
  //   await prisma.predio.create({
  //     data: {
  //       codigoCatastral: '2585-868-87456',
  //       matricula: '01N-2569-5884',
  //       via: 'CL',
  //       nro: '23',
  //       apen: '',
  //       cruce: 'CR',
  //       nro2: '30',
  //       apen2: '',
  //       placa: '23-68',
  //       apartamento: '',
  //       urb_edif: '',
  //       estrato: '2',
  //       barrio: 'Los alcazares',
  //       comuna: 'COMUNA 1',
  //       clasificacionSuelo: 'N/A',
  //       uso: 'vivienda',
  //       poligono: '0',
  //       zonaAvaluo: 'A',
  //       Propietarios: {
  //         create: {
  //           nombres: 'Cesar',
  //           apellidos: 'Ortiz',
  //           tipo_doc: 'C.C',
  //           numero_doc: '1149451394',
  //           email: 'cesarjavierortizmontero@gmail.com',
  //           telefono: '3205633553',
  //           es_Juridica: false,
  //         },
  //       },
  //     },
  //   });
  //   await prisma.radicado.create({
  //     data: {
  //       nro_radicado: '2021M12',
  //       cargo_fijo: 200000,
  //       Predio: {
  //         create: {
  //           codigoCatastral: '2585-868-87456',
  //           matricula: '01N-2569-5884',
  //           via: 'CL',
  //           nro: '23',
  //           apen: '',
  //           cruce: 'CR',
  //           nro2: '30',
  //           apen2: '',
  //           placa: '23-68',
  //           apartamento: '',
  //           urb_edif: '',
  //           estrato: '2',
  //           barrio: 'Los alcazares',
  //           comuna: 'COMUNA 1',
  //           clasificacionSuelo: 'N/A',
  //           uso: 'vivienda',
  //           poligono: '0',
  //           zonaAvaluo: 'A',
  //           Propietarios: {
  //             create: {
  //               nombres: 'Cesar',
  //               apellidos: 'Ortiz',
  //               tipo_doc: 'C.C',
  //               numero_doc: '1149451394',
  //               email: 'cesarjavierortizmontero@gmail.com',
  //               telefono: '3205633553',
  //               es_Juridica: false,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
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
