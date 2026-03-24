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

        errorElement: <ErrorFallback moduleName="Aplicación Principal" />, 
        children: [
            {
                path: ROUTES.CLIENTES,
              
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
