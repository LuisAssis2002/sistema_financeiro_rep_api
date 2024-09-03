import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createPagamento(req, res) {
        const { pagante, id_conta, valor, caixa } = req.body;
        try {
            const pagamento = await prisma.pagamento.create({
                data: {
                    morador: {
                        connect: { nome: pagante },
                    },
                    conta: {
                        connect: { id: id_conta},
                    },
                    valor: parseFloat(valor),
                    caixa: parseFloat(caixa),
                }
            })
            return res.json(pagamento);
        } catch(error) {
            return res.json({error});
        }
    },
    async findAllPagamento(req, res) {
        try {
            const index = await prisma.conta.count();
            const  pagamento = await prisma.pagamento.findMany({where: {id_conta: index-1}});
            return res.json(pagamento);
        } catch(error) {
            return res.json({error});
        }
    },
    async updatePagamento(req, res) {
        const {id, valor, caixa} = req.body;
        try {
            const pagamento = await prisma.pagamento.update({
                where: {id: id},
                data: {
                    valor: parseFloat(valor),
                    caixa: parseFloat(caixa),
                }
            });
            console.log(pagamento);
            return res.json(pagamento);
        } catch(error) {
            return res.json({ message: error.message });
        }
    }
}