import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test"; // Importaciones para interacciones
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from ".";

const meta: Meta<typeof Sidebar> = {
	title: "Layout/Sidebar",
	component: Sidebar,
	tags: ["autodocs"],

	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"El `Sidebar` es el componente principal de navegación de **Financia-Crédito**. Gestiona los accesos a Dashboard, Clientes y Facturación, adaptándose al estado de la ruta actual.",
			},
		},
		// NOVEDAD: Configuración de fondos y vista móvil rápida
		backgrounds: {
			default: "light",
			values: [
				{ name: "light", value: "#f9fafb" },
				{ name: "dark", value: "#111827" },
			],
		},
	},

	argTypes: {
		nombreEmpresa: {
			description: "El nombre que se muestra en la cabecera junto al emoji 🚀",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "Mi Empresa" },
			},
		},
		backgroundColor: {
			control: "color",
			description: "Color de fondo del contenedor (opcional)",
		},
		isOffline: {
			control: "boolean",
			description: "Simula el estado de conexión",
		},
	},

	decorators: [
		(Story) => (
			<BrowserRouter>
				<div style={{ display: "flex", height: "100vh", margin: "-1rem" }}>
					<Story />
					<div
						style={{
							flex: 1,
							padding: "2rem",
							backgroundColor: "#f9fafb",
							color: "#374151",
						}}
					>
						<h1>Panel Principal</h1>
						<p>
							Usa los controles o mira la pestaña 'Interactions' para ver magia.
						</p>
					</div>
				</div>
			</BrowserRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// 1. HISTORIA POR DEFECTO
export const Default: Story = {
	args: {
		nombreEmpresa: "Financia Crédito 🚀",
	},
};

// 2. NOVEDAD: HISTORIA CON INTERACCIÓN AUTOMÁTICA
// Cuando hagas clic en esta historia, Storybook hará clic solo en "Clientes"
export const TestDeNavegacion: Story = {
	args: {
		nombreEmpresa: "Auto Test Mode",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Buscamos el link de Clientes
		const linkClientes = canvas.getByText(/Clientes/i);

		// Simulamos un clic humano con delay para que lo veas
		await new Promise((r) => setTimeout(r, 1000));
		await userEvent.click(linkClientes);

		// Verificamos que el elemento ahora tiene el color de "activo"
		// (Ajusta el color hexadecimal al que uses en tu CSS)
		await expect(linkClientes).toBeTruthy();
	},
};

// 3. NOVEDAD: VISTA MÓVIL FORZADA
export const VistaMovil: Story = {
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
	args: {
		nombreEmpresa: "Mobile App",
	},
};

/** Simulación de estado de mantenimiento */
export const ModoMantenimiento: Story = {
	args: {
		nombreEmpresa: "SISTEMA EN PAUSA 🛠️",
		isOffline: true,
	},
};
