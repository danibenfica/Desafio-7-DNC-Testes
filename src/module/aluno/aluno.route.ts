import * as express from 'express'
import alunoFactory from './aluno.factory'

const router = express.Router()

router.get('/', async (_, res) => {
    const data = await alunoFactory.getAll()
    return res.status(200).json({ data })
})

router.post('/', async (req, res) => {
    const data = await alunoFactory.dbaluno(req.body)
    return res.status(201).json({ data })
})


export default router