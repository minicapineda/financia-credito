import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RemoteErrorBoundary from "../../components/ErrorFallback/ErrorBoundary";
import { Dashboard } from "../../features";
import { ROUTES } from "../../shared/constants";
import { ErrorFallback } from "../../components";

const ClientesApp = lazy(() => 
    import("clientes/ListClients").catch(() => ({
        default: () => <ErrorFallback moduleName="Clientes" />
    }))
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        // Si el error ocurre en cualquier hijo (como Clientes), este se activará
        errorElement: <ErrorFallback moduleName="Aplicación Principal" />, 
        children: [
            {
                path: ROUTES.CLIENTES,
                // Mantenlo aquí también por si el error es solo de este módulo
                errorElement: <ErrorFallback moduleName="Módulo de Clientes" />, 
                element: (
                    <RemoteErrorBoundary moduleName="Clientes">
                        <Suspense fallback={<div>Cargando Clientes...</div>}>
                            <ClientesApp />
                        </Suspense>
                    </RemoteErrorBoundary>
                ),
            },
        ],
    },
]);
