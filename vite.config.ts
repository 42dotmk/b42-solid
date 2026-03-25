import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), "");
  // @ts-ignore
  process.env = { ...process.env, ...env };

  return {
    plugins: [solidStart(), nitroV2Plugin(), tailwindcss()],
  };
});
