-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "cidade" TEXT,
    "data_matricula" TIMESTAMP(3),
    "n_quarto" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "c_agua" DOUBLE PRECISION NOT NULL,
    "c_eletrica" DOUBLE PRECISION NOT NULL,
    "IPTU" DOUBLE PRECISION NOT NULL,
    "outros" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "pagante" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "id_mensalidade" INTEGER NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "nome_pagante" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "produto" TEXT NOT NULL,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mensalidade" (
    "id" SERIAL NOT NULL,
    "nome_morador" TEXT NOT NULL,
    "id_conta" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "produto" TEXT NOT NULL,

    CONSTRAINT "Mensalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quarto" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Quarto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_nome_key" ON "Pessoa"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Quarto_nome_key" ON "Quarto"("nome");

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_n_quarto_fkey" FOREIGN KEY ("n_quarto") REFERENCES "Quarto"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_id_mensalidade_fkey" FOREIGN KEY ("id_mensalidade") REFERENCES "Mensalidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_nome_pagante_fkey" FOREIGN KEY ("nome_pagante") REFERENCES "Pessoa"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_nome_morador_fkey" FOREIGN KEY ("nome_morador") REFERENCES "Pessoa"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD CONSTRAINT "Mensalidade_id_conta_fkey" FOREIGN KEY ("id_conta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
