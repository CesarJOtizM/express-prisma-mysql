import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { radicado } = prisma;

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { Radicado, tramites, Predio, owners } = req.body;

  try {
    const data = await radicado.create({
      data: {
        ...Radicado,
        Tipo_Solicitud: {
          create: tramites,
        },
        Predio: {
          create: {
            ...Predio,
            propietarios: {
              create: owners,
            },
          },
        },
      },
    });
    res.status(201).send({ data });
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
    const data = await radicado.findMany({
      where: condition,
      include: {
        Tipo_Solicitud: {
          select: {
            licencia: true,
            objetivo_tramite: true,
            detalles_solicitud: true,
          },
        },
      },
    });
    res.status(200).send({ data });
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
        Predio: true,
        Tramitador: true,
        Tipo_Solicitud: true,
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
