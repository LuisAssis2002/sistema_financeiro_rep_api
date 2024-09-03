import { PrismaClient } from "@prisma/client";
import Calc from "../calculo/calc";
const prisma = new PrismaClient();

export default {
    async createMensalidade(req, res) {
        const { nome_morador, id_conta, valor, caixa} = req.body;

        try {
            const mensalidade = await prisma.mensalidade.create({
                data: {
                    morador: {
                        connect: { nome: nome_morador },
                    },
                    conta: {
                        connect: { id: id_conta},
                    },
                    valor: valor,
                    caixa: caixa
                }
            })
            return res.json(mensalidade);
        } catch(error) {
            return res.json({error});
        }
    },
    async findAllMensalidade(req, res) {
        try {
            const  mensalidade = await prisma.mensalidade.findMany();
            return res.json(mensalidade);
        } catch(error) {
            return res.json({error});
        }
    },
    async updateMensalidade(req, res) {
        const {id, valor, caixa } = req.body;
        try {
            const mensalidade = await prisma.mensalidade.update({
                where: {id: id},
                data: {
                    valor: parseFloat(valor),
                    caixa: parseFloat(caixa),
                }
            });
            return res.json(mensalidade);
        } catch(error) {
            return res.json({ message: error.message });
        }
    }
}