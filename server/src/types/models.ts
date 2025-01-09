import { Prisma } from "@prisma/client";
import { PrismaModels } from "prisma-models";

export type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
