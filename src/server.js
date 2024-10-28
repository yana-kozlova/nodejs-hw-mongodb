import express, { raw } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pino from 'pino-http';
import { env } from './utils/env.js';

import * as contactServices from './services/contacts.js';

export const startServer = () => {
  const app = express();

  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty'
    }
  })

  app.use(logger);

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data
    })
  })

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params

    try {
      const data = await contactServices.getContactById(id);

      if (!data) {
        return res.status(404).json({
          message: `Contact not found`
        });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  })

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`
    })
  })

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log('Server running on 3000 PORT'))
}