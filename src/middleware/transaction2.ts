import { Request, Response, NextFunction } from 'express';
import { pool } from '../db';
import { PoolClient } from 'pg';

declare global {
  namespace Express {
    interface Request {
      dbClient?: PoolClient;
    }
  }
}

export const withTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const client = await pool.connect();
  req.dbClient = client;

  try {
    await client.query('BEGIN');
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        await client.query('COMMIT');
      } else {
        await client.query('ROLLBACK');
      }
      client.release();
    });
    next();
  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    next(err);
  }
};
