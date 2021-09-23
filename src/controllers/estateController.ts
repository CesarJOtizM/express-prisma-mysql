import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { predio } = prisma;

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  try {
    const data = await predio.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).send({ data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the Predio.',
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const { matricula } = req.query;

  const condition = matricula ? { matricula: { contains: `${matricula}` } } : undefined;

  try {
    const data = await predio.findMany({ where: condition });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while finding the predio.',
    });
  }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await predio.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Propietarios: true,
        Radicados: {
          select: { nro_radicado: true },
        },
      },
    });
    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while find the predio with id:${id}.`,
    });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await predio.update({
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
        message: `Some error occurred while update the predio with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while update the predio with id:${id}.`,
    });
  }
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await predio.delete({
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
        message: `Some error occurred while delete the predio with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while delete the predio with id:${id}.`,
    });
  }
};
