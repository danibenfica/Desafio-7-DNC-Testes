import * as express from 'express';
import * as alunoModel from './aluno.model';

export const router = express.Router();

router.get('/', async (_, res) => {
  const data = await alunoModel.getAll();
  return res.status(200).json({ data });
});

router.post('/', async (req, res) => {
  const data = await alunoModel.store(req.body);
  return res.status(200).json({ data });
});


export default router;
