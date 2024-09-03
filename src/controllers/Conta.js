import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Calc from "../calculo/calc";

export default {
    async createConta(req, res) {
        const { c_agua, c_eletrica, c_internet, IPTU, outros } = req.body;
        try {
            const conta = await prisma.conta.create({
                data: {
                    c_agua: parseFloat(c_agua),
                    c_eletrica: parseFloat(c_eletrica),
                    c_internet: parseFloat(c_internet),
                    IPTU: parseFloat(IPTU),
                    outros: parseFloat(outros),
                }
            })
            return res.json(conta);
        } catch(error) {
            return res.json({error});
        }
    },
    async findConta(req, res) {
        const index = await prisma.conta.count();
        try {
            const  conta = await prisma.conta.findUnique({where: {id : index-1}});
            return res.json([conta]);
        } catch(error) {
            return res.json({error});
        }
    },
    async updateConta(req, res) {
        const { id, c_agua, c_eletrica, c_internet, IPTU, outros } = req.body;
        try {
            const conta = await prisma.conta.update({
                where: {id : id},
                data: {
                    c_agua: parseFloat(c_agua),
                    c_eletrica: parseFloat(c_eletrica),
                    c_internet: parseFloat(c_internet),
                    IPTU: parseFloat(IPTU),
                    outros: parseFloat(outros),
                }
            });
            return res.json(conta);
        } catch(error) {
            return res.json({error});
        }
    },
    async getIndexConta(req, res) {
        try {
            const index = await prisma.conta.count();
            return res.json(index);
        } catch(error) {
            return res.json({error});
        }
    }
}