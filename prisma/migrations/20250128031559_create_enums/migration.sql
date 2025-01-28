/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `category` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDENTE', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ELETRONICOS', 'ROUPAS', 'ELETRODOMESTICOS', 'LIVROS', 'MERCEARIA', 'BELEZA', 'ESPORTES', 'BRINQUEDOS', 'MOVEIS', 'AUTOMOTIVO', 'OUTROS');

-- DropIndex
DROP INDEX "products_category_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategory" NOT NULL;
