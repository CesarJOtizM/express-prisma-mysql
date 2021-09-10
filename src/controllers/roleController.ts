import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const { role } = prisma;

export const create = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  try {
    const data = await role.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).send({ datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the role.',
    });
  }
};

export const findAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await role.findMany();
    res.status(200).send({ datos: data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while finding the roles.',
    });
  }
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await role.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send({
      datos: data,
    });
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while find the role with id:${id}.`,
    });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await role.update({
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
        message: `Some error occurred while update the role with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while update the role with id:${id}.`,
    });
  }
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await role.delete({
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
        message: `Some error occurred while delete the role with id:${id}.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || `Some error occurred while delete the role with id:${id}.`,
    });
  }
};
