/*
  Warnings:

  - The `data_nascimento` column on the `Pessoa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `data_matricula` column on the `Pessoa` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "data_nascimento",
ADD COLUMN     "data_nascimento" TIMESTAMP(3),
DROP COLUMN "data_matricula",
ADD COLUMN     "data_matricula" TIMESTAMP(3);
