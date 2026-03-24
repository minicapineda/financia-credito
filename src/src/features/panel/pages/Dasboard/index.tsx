import { lazy, Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../../../components";
import styles from "./dashboard.module.css"

const RemoteListClients = lazy(() => import("clientes/ListClients"));

export const Dashboard = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<Sidebar />

			<div className={styles.content_wrapper}>
				<header className={styles.header}>
					
				</header>

				<main className={styles.main}>
					{location.pathname === "/" ? (
						<div className={styles.dashboard_card}>
						
							<button
								type="button"
								className={styles.card_button}
								onClick={() => navigate("/clientes")} 
							>
								<div className={styles.card_icon}>👥</div>
								<h4 className={styles.card_title}>Módulo Clientes</h4>
							</button>
						</div>
					) : (
						<div className={styles.outlet_container}>
						
							<Suspense fallback={<div>Cargando Microfrontend...</div>}>
								{location.pathname === "/clientes" ? (
									<RemoteListClients />
								) : (
									<Outlet />
								)}
							</Suspense>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};
