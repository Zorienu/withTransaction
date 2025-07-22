import { Router } from 'express';
import { User } from '../entity/User';

const router = Router();

router.post('/', async (req, res) => {
  const queryRunner = req.queryRunner;
  if (!queryRunner) return res.status(500).send('No transaction found');

  const userRepo = queryRunner.manager.getRepository(User);

  const { name, email } = req.body;

  try {
    const user = userRepo.create({ name, email });
    await userRepo.save(user);

    throw new Error('This won\'t allow the transaction to commit');
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting user');
  }
});

export default router;
