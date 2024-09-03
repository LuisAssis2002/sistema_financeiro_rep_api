import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createQuarto(req, res) {
    const {valor, nome} = req.body;
    try {
        const quarto = await prisma.quarto.findUnique({ where: { nome : nome } });
        
        if (quarto) {
            return res.json({message : "Error: Nome de quarto já existente cadastrado!"});
        }

        const new_quarto = await prisma.quarto.create({
            data: {
                valor: parseFloat(valor),
                nome: nome,
            }
        });
        res.json(new_quarto);
    } catch (error) {
        return res.json({ message: error.message });
    }
  },
  async findAllQuarto(req, res) {
    try {
        const allQuarto = await prisma.quarto.findMany()
        return res.json(allQuarto);
    } catch(error) {
        return res.json({error});
    }
  }
}