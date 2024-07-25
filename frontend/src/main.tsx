import React, {lazy} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Layout from "./Layout.tsx";
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contact = lazy(() => import('./pages/Contact'));
import NoMatch from "./pages/NoMatch.tsx";
import Authors from "./pages/Authors.tsx";
import {Login} from "@mui/icons-material";
import SignIn from "./pages/SignIn.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="authors" element={<Authors />} />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                        <Route path="/login" element={<SignIn />} />
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
