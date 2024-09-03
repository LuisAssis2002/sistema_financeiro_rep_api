import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createPessoa(req, res) {
    const { nome, data_matricula, data_nascimento, cidade, n_quarto } = req.body;

    try {
      const pessoa = await prisma.pessoa.findUnique({ where: { nome : nome } });

      if (pessoa) {
        return res.json({ message: "Nome de morador já cadastrado" });
      }

      const post = await prisma.pessoa.create({
        data: {
          nome: nome,
          quarto: {
            connect : { nome : n_quarto},
          },
          data_matricula: data_matricula,
          data_nascimento: data_nascimento,
          cidade: cidade,
        }
      });

      res.json(post);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async updatePessoa(req, res) {
    const { nome, morador, saida, data_matricula, data_nascimento, cidade, n_quarto, } = req.body;
    try {
      const pessoa = await prisma.pessoa.update({
        where: {
          nome: nome,
        },
        data: {
          morador: morador,
          saida: saida,
        }
      });
      console.log(pessoa);

      res.json(pessoa);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  async findAllPessoa(req, res) {
    try {
      const users = await prisma.pessoa.findMany({ where: {morador: true}});
      return res.json(users);
    } catch(error) {
      return res.json({error});
    }
  }
};