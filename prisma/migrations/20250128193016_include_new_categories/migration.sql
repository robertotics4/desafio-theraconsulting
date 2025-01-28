-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductCategory" ADD VALUE 'PETSHOP';
ALTER TYPE "ProductCategory" ADD VALUE 'SAUDE';
ALTER TYPE "ProductCategory" ADD VALUE 'INFORMATICA';
ALTER TYPE "ProductCategory" ADD VALUE 'JARDIM';
ALTER TYPE "ProductCategory" ADD VALUE 'BEBIDAS';
ALTER TYPE "ProductCategory" ADD VALUE 'ARTIGOS_FESTA';
ALTER TYPE "ProductCategory" ADD VALUE 'JOIAS';
ALTER TYPE "ProductCategory" ADD VALUE 'CALCADOS';
ALTER TYPE "ProductCategory" ADD VALUE 'ARTESANATO';
ALTER TYPE "ProductCategory" ADD VALUE 'PAPELARIA';
ALTER TYPE "ProductCategory" ADD VALUE 'MUSICA';
ALTER TYPE "ProductCategory" ADD VALUE 'VIDEO_GAME';
ALTER TYPE "ProductCategory" ADD VALUE 'SERVICOS';
ALTER TYPE "ProductCategory" ADD VALUE 'INDUSTRIAL';
ALTER TYPE "ProductCategory" ADD VALUE 'CONSTRUCAO';
