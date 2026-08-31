import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_IMAGES_BASE_URL: z.url(),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_IMAGES_BASE_URL: process.env.NEXT_PUBLIC_IMAGES_BASE_URL,
});

if (!parsed.success) {
  throw new Error(`Invalid public environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const publicEnv = parsed.data;