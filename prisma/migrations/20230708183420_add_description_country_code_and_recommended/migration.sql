/*
  Warnings:

  - Added the required column `countryCode` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "recommended" BOOLEAN NOT NULL DEFAULT false;
