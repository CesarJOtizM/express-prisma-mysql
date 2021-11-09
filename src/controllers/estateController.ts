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
  const { Predio, owners } = req.body;

  try {
    const data = await predio.create({
      data: {
        ...Predio,
        propietarios: {
          create: owners,
        },
      },
      include: {
        propietarios: true,
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
  const { codigoCatastral } = req.query;
  const { matricula } = req.query;

  const condition1 = codigoCatastral
    ? { codigoCatastral: { contains: `${codigoCatastral}` } }
    : undefined;

  const condition2 = matricula ? { matricula: { contains: `${matricula}` } } : undefined;

  try {
    const data = await predio.findMany({ where: condition1 ? condition1 : condition2 });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while finding the predio.',
    });
  }
};

export const findOneByID = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await predio.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        propietarios: true,
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

export const findOneByCodCas = async (req: Request, res: Response): Promise<void> => {
  const { codigoCatastral } = req.params;

  try {
    const data = await predio.findUnique({
      where: {
        codigoCatastral,
      },
      include: {
        propietarios: true,
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
      message:
        error || `Some error occurred while find the predio with id:${codigoCatastral}.`,
    });
  }
};

export const edit = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { Predio, owners } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ownersUpdate: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  owners.map((el: any) => {
    ownersUpdate.push({
      create: { ...el },
      update: { ...el },
      where: { numero_doc: el.numero_doc },
    });
  });

  try {
    const data = await predio.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...Predio,
        propietarios: {
          upsert: ownersUpdate,
        },
      },
      include: {
        propietarios: true,
      },
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

export const removeOwner = async (req: Request, res: Response): Promise<void> => {
  const { idOwner } = req.body;
  const { id } = req.params;

  try {
    const data = await predio.update({
      where: {
        id: parseInt(id),
      },
      data: {
        propietarios: {
          disconnect: [{ id: idOwner }],
        },
      },
      select: {
        propietarios: true,
      },
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
