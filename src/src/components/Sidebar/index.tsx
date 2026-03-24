import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../shared/constants";
import styles from "./sidebar.module.css";

interface SidebarProps {
	nombreEmpresa?: string;
	backgroundColor?: string;
	padding?: number;
	isOffline?: boolean;
}

export const Sidebar = ({
	nombreEmpresa = "Mi Empresa",
	backgroundColor = "#1a1c23",
	padding = 24,
	isOffline = false,
}: SidebarProps) => {
	const location = useLocation();

	return (
		<aside
			className={styles.container}
			style={
				{
					"--sidebar-bg": backgroundColor,
					"--sidebar-padding": `${padding}px`,
				} as React.CSSProperties
			}
		>
			<div className={styles.header}>
				<h2
					className={`${styles.title} ${isOffline ? styles.titleOffline : styles.titleOnline}`}
				>
					<span>{isOffline ? "⚠️" : "🚀"}</span>
					{nombreEmpresa}
				</h2>
				<small className={styles.subtitle}>
					{isOffline ? "Modo Desconectado" : "Gestión Centralizada"}
				</small>
			</div>

			<nav className={styles.nav}>
				<Link
					to="/"
					className={`${styles.link} ${location.pathname === "/" ? styles.linkActive : ""}`}
				>
					<span style={{ marginRight: "10px" }}>🏠</span> Dashboard
				</Link>

				<Link
					to={`/${ROUTES.CLIENTES}`}
					className={`${styles.link} ${location.pathname.includes(ROUTES.CLIENTES) ? styles.linkActive : ""}`}
				>
					<span style={{ marginRight: "10px" }}>👥</span> Clientes
				</Link>
			</nav>

			<div className={styles.footer}>Versión 1.0.0</div>
		</aside>
	);
};
