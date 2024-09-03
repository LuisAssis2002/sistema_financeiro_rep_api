import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createCompra(req, res) {
        const { nome_pagante, id_conta, valor, produto} = req.body;
        console.log(nome_pagante);
        console.log({valor});
        try {
            const compra = await prisma.compra.create({
                data: {
                    pagante: {
                        connect: { nome: nome_pagante }
                    },
                    conta: {
                        connect: { id: parseInt(id_conta)}
                    },
                    valor: parseFloat(valor),
                    produto: produto,
                }
            })
            return res.json(compra);
        } catch(error) {
            return res.json({error});
        }
    },
    async findAllCompra(req, res) {
        try {
            const index = await prisma.conta.count();
            const  compras = await prisma.compra.findMany({where: {id_conta: index}});
            return res.json(compras);
        } catch(error) {
            return res.json({error});
        }
    },
    async findAllCompra0(req, res) {
        try {
            const index = await prisma.conta.count();
            const  compras = await prisma.compra.findMany({where: {id_conta: index-1}});
            return res.json(compras);
        } catch(error) {
            return res.json({error});
        }
    },
    async findCompra(req, res) {
        const { id } = req.body;
        try {
          const compra = await prisma.compra.findUnique({ where : { id: id}});
          return res.json(compra);
        } catch(error) {
          return res.json({error});
        }
    },
    async updateCompra(req, res) {
        const {id, id_conta, nome_pagante, valor, produto} = req.body;
        console.log(id);
        try {
            const compra = await prisma.compra.update({
                where: {id: id},
                data: {
                    pagante: {
                        connect: { nome: nome_pagante }
                    },
                    conta: {
                        connect: { id: parseInt(id_conta)}
                    },
                    valor: parseFloat(valor),
                    produto: produto,
                }
            });
            console.log({compra});
            return res.json(compra);
        } catch(error) {
            return res.json({ message: error.message });
        }
    }
}