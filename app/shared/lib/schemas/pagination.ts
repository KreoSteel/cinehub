import { z } from "zod";

export const pageSchema = z.coerce.number().int().min(1).catch(1);