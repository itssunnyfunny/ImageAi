-- CreateEnum
CREATE TYPE "modelTraningStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "status" "modelTraningStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "modelTraningStatusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWords" TEXT;

-- AlterTable
ALTER TABLE "OutputImages" ADD COLUMN     "falAiRequestId" TEXT;
