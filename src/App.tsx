import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {Layout} from "@/components/refine-ui/layout/layout.tsx";
import { dataProvider } from "./providers/data";
import Dashboard from "@/pages/dashboard.tsx";
import {Home, Package} from "lucide-react";
import {Outlet} from "react-router";
import ProductsList from "@/pages/products/list.tsx";
import ProductsCreate from "@/pages/products/create.tsx";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "MC4OJp-aMFoEL-jB8n0c",
                            }}
                            resources={[
                                {
                                    name: 'dashboard',
                                    list: '/',
                                    meta: {label: 'Home', icon: <Home/>}
                                },
                                {
                                    name: 'products',
                                    list: '/products',
                                    create: '/products/create',
                                    meta: {label: 'Productos', icon: <Package/>}
                                }
                            ]}
                        >
                            <Routes>
                                <Route element={
                                    <Layout>
                                        <Outlet />
                                    </Layout>
                                }>
                                    <Route path="/" element={<Dashboard />} />

                                    <Route path="products">
                                        <Route index element={<ProductsList/>}/>
                                        <Route path="create" element={<ProductsCreate/>}/>
                                    </Route>
                                </Route>
                            </Routes>
                            <Toaster />
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;