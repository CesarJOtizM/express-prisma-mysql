import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { User } from '../types/usuario.type';

dotenv.config();

const prisma = new PrismaClient();
const { usuario } = prisma;

const rounds = process.env.AUTH_ROUNDS || 10;
const secret = process.env.AUTH_SECRET || 'secret';
const expire = process.env.AUTH_EXPIRES || '2h';

export const createUser = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const { password, email }: User = req.body;

  if (password.length >= 6) {
    const passHash = hashSync(password, +rounds);

    try {
      const data = await usuario.create({
        data: { ...req.body, email, password: passHash },
      });
      const token = sign({ user: data }, secret, {
        expiresIn: expire,
      });

      res.status(201).send({ data, token });
    } catch (error) {
      res.status(500).send({
        message: error || 'Some error occurred while creating the User.',
      });
    }
  } else {
    res.status(401).send({
      message: 'invalid password.',
    });
  }
};

export const singIn = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  const { password, email } = req.body;

  // Find user
  try {
    const findUser = await usuario.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      if (compareSync(password, findUser.password)) {
        const token = sign({ user: findUser }, secret, {
          expiresIn: expire,
        });
        res.status(200).send({ data: findUser, token });
      } else {
        res.status(401).send({
          message: 'invalid password.',
        });
      }
    } else {
      res.status(404).send({
        message: 'Email dont found',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error || 'Some error occurred while creating the User.',
    });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.query;

  const condition = email ? { email: { equals: `%${email}%` } } : undefined;

  try {
    const data = await usuario.findMany({
      where: condition,
      include: {
        tramitador: true,
        propietario: true,
        usuario_Rol: { select: { rol_ID: true } },
      },
    });
    res.status(200).send({ datos: data });
  } catch (error) {
    res.status(500).send({
      mensaje: error || 'Error al listar los vehículos.',
    });
  }
};
