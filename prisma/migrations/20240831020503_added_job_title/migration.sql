-- AlterTable
ALTER TABLE "Compra" ADD COLUMN     "id_conta" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "c_internet" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_id_conta_fkey" FOREIGN KEY ("id_conta") REFERENCES "Conta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
