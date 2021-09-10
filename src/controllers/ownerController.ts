import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { propietario } = prisma;

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  try {
    const data = await propietario.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).send({ datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the owner.',
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const { doc } = req.query;

  const condition = doc ? { numero_doc: { contains: `${doc}` } } : undefined;

  try {
    const data = await propietario.findMany({
      where: condition,
      include: {
        predios: {
          select: { predio_ID: true },
        },
      },
    });
    res.status(200).send({ datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while finding the owner.',
    });
  }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await propietario.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        predios: true,
      },
    });
    res.status(200).send({
      datos: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while find the owner with id:${id}.`,
    });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await propietario.update({
      where: {
        id: parseInt(id),
      },
      data: { ...req.body },
    });
    if (data) {
      res.status(200).send({
        datos: data,
      });
    } else {
      res.status(400).send({
        message: `Some error occurred while update the owner with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while update the owner with id:${id}.`,
    });
  }
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await propietario.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (data) {
      res.status(200).send({
        datos: data,
      });
    } else {
      res.status(400).send({
        message: `Some error occurred while delete the owner with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while delete the owner with id:${id}.`,
    });
  }
};
