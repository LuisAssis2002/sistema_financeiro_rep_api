import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();

export default async function Calc(rew, res) {
    var com = null;
    var gastos = [];
    const index = await prisma.conta.count();
    const quant = await prisma.pessoa.count({where: {morador: true}});
    const conta = await prisma.conta.findUnique({ where: {id: index-1}});
    com = await prisma.compra.findMany({where: {id_conta: index-1}});
    const moradores = await prisma.pessoa.findMany({where: {morador: true}});
    const total = conta.IPTU + conta.c_agua + conta.c_eletrica + conta.c_internet + conta.outros;
    const c_valor = total / quant;
    var compras_t = 0;
    if(com != null) {
        com.map(e => {
            compras_t = compras_t + e.valor;
        });
    }
    var compra_p = compras_t / quant;
    for(var i = 0; i < quant; i++){
        var valor_compras_i = 0;
        var total_compras_i = 0;
        var valor_faltante_i = 0;
        var valor_final_i = 0;
        var valor_aluguel_i = 0;
        var caixa = 30;
        var mens = null;
        var pag = null;
        const compras_i = await prisma.compra.findMany({where: {id_conta: index-1, nome_pagante: moradores[i].nome}});
        compras_i.map(e => {
            total_compras_i = total_compras_i + e.valor;
        })
        valor_compras_i = compra_p - ((quant - 1)*total_compras_i/quant);
        const quarto = await prisma.quarto.findUnique({where: {nome: moradores[i].n_quarto}});
        valor_aluguel_i = quarto.valor;
        if((index - 2) >= 1) {
            mens = await prisma.mensalidade.findMany({where: {id_conta: index-2, nome_morador: moradores[i].nome}});
            pag = await prisma.pagamento.findMany({where: {id_conta: index-2, pagante: moradores[i].nome}});
        }
        if((mens.length != 0) && (pag.length != 0)) { 
            valor_faltante_i = mens[0].valor - pag[0].valor
            caixa = caixa + mens[0].caixa - pag[0].caixa;
        }
        if((mens.length != 0) && (pag.length == 0)) { 
            valor_faltante_i = mens[0].valor;
            caixa = caixa + mens[0].caixa;
        }
        valor_final_i = valor_compras_i + valor_faltante_i + c_valor + valor_aluguel_i;
        var data = {
            id_conta: index,
            nome_morador: moradores[i].nome,
            c_valor: c_valor, 
            valor_aluguel_i: valor_aluguel_i, 
            total_compras_i: total_compras_i,
            valor_compras_i: valor_compras_i, 
            valor_faltante_i: valor_faltante_i, 
            valor: valor_final_i,
            caixa: caixa,
        };
        gastos.push(data);
    }
    if(res !== undefined) {
        return res.json(gastos);

    }
}