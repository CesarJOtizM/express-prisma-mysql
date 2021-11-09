import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { radicado, predio, propietario, tramitador } = prisma;

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { settled, request, estate, owners, docs, processor } = req.body;

  try {
    const estateData = await predio.upsert({
      create: estate,
      update: estate,
      where: { codigoCatastral: estate.codigoCatastral },
    });

    owners.map(
      async (el: any) =>
        await propietario.upsert({
          create: {
            ...el,
            predios: {
              connect: { id: estateData.id },
            },
          },
          update: {
            ...el,
            predios: {
              connect: { id: estateData.id },
            },
          },
          where: { numero_doc: el.numero_doc },
        }),
    );

    const radicados = await radicado.count();
    const consecutivo = `CU-0462-${radicados}`;

    if (processor) {
      const processorData = await tramitador.upsert({
        create: processor,
        update: processor,
        where: { numero_doc: processor.numero_doc },
      });

      const data = await radicado.create({
        data: {
          ...settled,
          crated_at: new Date(),
          cargo_varible: 0,
          nro_radicado: consecutivo,

          Estado: {
            connect: {
              id: 1,
            },
          },

          Predio: {
            connect: { id: estateData.id },
          },

          Tipo_Solicitud: {
            create: request,
          },

          DocumentosTramite: {
            connect: docs,
          },
          Tramitador: {
            connect: { id: processorData.id },
          },
        },
        include: {
          Predio: {
            include: {
              propietarios: true,
            },
          },
          Tramitador: true,
          DocumentosTramite: true,
          Tipo_Solicitud: true,
        },
      });
      res.status(201).send({ data });
    } else {
      const data = await radicado.create({
        data: {
          ...settled,
          crated_at: new Date(),
          cargo_varible: 0,
          nro_radicado: consecutivo,

          Estado: {
            connect: {
              id: 1,
            },
          },

          Predio: {
            connect: { id: estateData.id },
          },

          Tipo_Solicitud: {
            create: request,
          },

          DocumentosTramite: {
            connect: docs,
          },
        },
        include: {
          Predio: {
            include: {
              propietarios: true,
            },
          },
          Tramitador: true,
          DocumentosTramite: true,
          Tipo_Solicitud: true,
        },
      });
      res.status(201).send({ data });
    }
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating settled.',
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const { nro_radicado } = req.query;

  const condition = nro_radicado
    ? { nro_radicado: { contains: `${nro_radicado}` } }
    : undefined;

  try {
    const count = await radicado.count();
    const data = await radicado.findMany({
      where: condition,
      include: {
        Tipo_Solicitud: true,
        Predio: true,
        DocumentosTramite: true,
      },
    });
    res.status(200).send({ data, count });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while finding the settled.',
    });
  }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await radicado.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Predio: {
          include: {
            propietarios: true,
          },
        },
        Tramitador: true,
        Tipo_Solicitud: true,
        DocumentosTramite: true,
      },
    });
    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while find the settled with id:${id}.`,
    });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await radicado.update({
      where: {
        id: parseInt(id),
      },
      data: { ...req.body },
    });
    if (data) {
      res.status(200).send({
        data,
      });
    } else {
      res.status(400).send({
        message: `Some error occurred while update the settled with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while update the settled with id:${id}.`,
    });
  }
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await radicado.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (data) {
      res.status(200).send({
        data,
      });
    } else {
      res.status(400).send({
        message: `Some error occurred while delete the settled with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while delete the settled with id:${id}.`,
    });
  }
};
