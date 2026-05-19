/*
  Warnings:

  - Added the required column `caption` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `html` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keywords` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoDescription` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "html" TEXT NOT NULL,
ADD COLUMN     "keywords" JSONB NOT NULL,
ADD COLUMN     "seoDescription" TEXT NOT NULL;
