import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig} from "vite";
import fs from "fs"; 

interface RemoteConfig {
  [key: string]: string;
}

export default defineConfig(() => {
  const getRemotes = (): RemoteConfig => {
    try {
      const route = path.resolve(__dirname, "public", "microfrontends.json");
      if (fs.existsSync(route)) {
        const conten = fs.readFileSync(route, "utf-8");
        return JSON.parse(conten) as RemoteConfig;
      }
      return {};
    } catch (error) {
      console.error("Error cargando microfrontends.json:", error);
      return {};
    }
  };

  const RemoteControls = getRemotes();
  const namesRemotes = Object.keys(RemoteControls);

  return {
    plugins: [
      react(),
      federation({
        name: "dashboard",
        remotes: RemoteControls,
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
  
        ...namesRemotes.reduce((acc, key) => {
          acc[key] = key; 
          return acc;
        }, {} as Record<string, string>) 
      },
    },
    optimizeDeps: {
      exclude: namesRemotes
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