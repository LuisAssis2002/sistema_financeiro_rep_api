/*
  Warnings:

  - You are about to drop the column `produto` on the `Mensalidade` table. All the data in the column will be lost.
  - The primary key for the `Pessoa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `caixa` to the `Mensalidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caixa` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_n_quarto_fkey";

-- AlterTable
ALTER TABLE "Mensalidade" DROP COLUMN "produto",
ADD COLUMN     "caixa" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Pagamento" ADD COLUMN     "caixa" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Pessoa" DROP CONSTRAINT "Pessoa_pkey",
DROP COLUMN "id",
ADD COLUMN     "morador" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "saida" TEXT,
ALTER COLUMN "n_quarto" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_n_quarto_fkey" FOREIGN KEY ("n_quarto") REFERENCES "Quarto"("nome") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_pagante_fkey" FOREIGN KEY ("pagante") REFERENCES "Pessoa"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
