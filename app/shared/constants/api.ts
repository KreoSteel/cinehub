import { publicEnv } from "./env.public";
import { serverEnv } from "./env.server";

export const API_URL = publicEnv.NEXT_PUBLIC_API_URL;
export const API_KEY = `api_key=${serverEnv.API_KEY}`;