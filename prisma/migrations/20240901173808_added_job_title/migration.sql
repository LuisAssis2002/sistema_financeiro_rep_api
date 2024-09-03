/*
  Warnings:

  - You are about to drop the column `id_mensalidade` on the `Pagamento` table. All the data in the column will be lost.
  - Added the required column `id_conta` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pagamento" DROP CONSTRAINT "Pagamento_id_mensalidade_fkey";

-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "id_mensalidade",
ADD COLUMN     "id_conta" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_id_conta_fkey" FOREIGN KEY ("id_conta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
