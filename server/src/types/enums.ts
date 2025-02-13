// [ src/types/enums.ts ]
import { $Enums } from "@prisma/client";
import { PrismaEnums } from "prisma-models";

export type Enums = PrismaEnums<typeof $Enums>;

// export type Enums = {
//   accessType: "LIMITED" | "FULL";
// };
