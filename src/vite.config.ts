import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import path from "path";

import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		federation({
    name: "dashboard", 
    remotes: {
        clientes: "http://localhost:5171/assets/remoteEntry.js",
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
			src: path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5170,
		host: true,
		strictPort: true,
		watch: {
			usePolling: true,
		},
	},
	build: {
		target: "esnext", 
		minify: false,
		cssCodeSplit: false,
		manifest: true,
		modulePreload: false, 
		rollupOptions: {
			output: {
				format: "esm",
				
			},
		},
	},
});
