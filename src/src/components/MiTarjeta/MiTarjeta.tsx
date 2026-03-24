interface MiTarjetaProps {
	titulo: string;
	contenido: string;
	colorFondo?: string;
}

export const MiTarjeta = ({
	titulo,
	contenido,
	colorFondo = "white",
}: MiTarjetaProps) => {
	return (
		<div
			style={{
				backgroundColor: colorFondo,
				border: "1px solid #ccc",
				padding: "20px",
				borderRadius: "8px",
				boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
			}}
		>
			<h2 style={{ margin: "0 0 10px 0" }}>{titulo}</h2>
			<p>{contenido}</p>
		</div>
	);
};
