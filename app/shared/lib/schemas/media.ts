import { z } from "zod";

export const mediaTypeSchema = z.enum(["movie", "tv"]);