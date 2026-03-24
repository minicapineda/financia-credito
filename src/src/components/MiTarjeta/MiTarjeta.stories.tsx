// src/src/components/MiTarjeta/MiTarjeta.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { MiTarjeta } from "./MiTarjeta"; // <-- Importamos el componente de arriba

const meta: Meta<typeof MiTarjeta> = {
	title: "Componentes/MiTarjeta",
	component: MiTarjeta,
	// Esto permite que Storybook cree controles automáticos (inputs, color pickers)
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MiTarjeta>;

// Variante normal
export const Default: Story = {
	args: {
		titulo: "Título de Prueba",
		contenido: "Este contenido viene desde Storybook.",
	},
};

export const ConColor: Story = {
	args: {
		titulo: "Tarjeta Azul",
		contenido: "Soy una variante con fondo diferente.",
		colorFondo: "lightblue",
	},
};
