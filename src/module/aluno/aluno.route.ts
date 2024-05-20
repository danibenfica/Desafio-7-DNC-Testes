import * as express from 'express'
import alunoFactory from './aluno.factory'

const router = express.Router()

router.get('/', async (_, res) => {
    const data = await alunoFactory.getAll()
    return res.status(200).json({ data })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const data = await alunoFactory.getById(Number(id))
    if (!data) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }
    return res.status(200).json({ data })
})

router.post('/', async (req, res) => {
    const { nome, cpf } = req.body

    if (!nome || !cpf) {
        return res.status(400).json({ mensagem: 'Insira o nome e o cpf!' })
    }

    const existingAlunoByCpf = await alunoFactory.getByCpf(cpf)
    if (existingAlunoByCpf) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado!' })
    }

    const data = await alunoFactory.dbaluno(req.body)
    return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', data })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, cpf } = req.body

    if (!nome && !cpf) {
        return res.status(400).json({ mensagem: 'Insira o nome ou o cpf!' })
    }

    if (cpf) {
        const existingAlunoByCpf = await alunoFactory.getByCpf(cpf)
        if (existingAlunoByCpf && existingAlunoByCpf.id !== Number(id)) {
            return res.status(400).json({ mensagem: 'CPF já cadastrado!' })
        }
    }

    const updateData: any = {}
    if (nome) updateData.nome = nome
    if (cpf) updateData.cpf = cpf

    const data = await alunoFactory.updateById(Number(id), updateData)
    if (!data) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }
    return res.status(200).json({ mensagem: 'Dados atualizados com sucesso!', data })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const success = await alunoFactory.deleteById(Number(id))
    if (!success) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }
    return res.status(200).json({ mensagem: 'Aluno deletado com sucesso!' })
})

export default router
