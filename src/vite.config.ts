import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: "dashboard",
        remotes: {
          
          clientes: env.VITE_REMOTE_CLIENTES ,
        },
        shared: [
          "react",
          "react-dom",
          "react-router-dom",
          "@mui/material",
          "@emotion/react",
          "@emotion/styled",
          "@mui/x-data-grid"
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "src": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5170,
      host: true,
      strictPort: true,
    },
	build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});