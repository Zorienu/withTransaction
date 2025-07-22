import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { QueryRunner } from 'typeorm';

declare global {
  namespace Express {
    interface Request {
      queryRunner?: QueryRunner;
    }
  }
}

export const withTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const queryRunner = AppDataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  req.queryRunner = queryRunner;

  res.on('finish', async () => {
    try {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        await queryRunner.commitTransaction();
      } else {
        await queryRunner.rollbackTransaction();
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  });

  next();
};
