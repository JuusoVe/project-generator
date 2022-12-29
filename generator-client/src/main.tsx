import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants';
import CreateLayout from './layouts/create';
import PageCreate from './components/PageCreate';
import Keys from './components/PageKeys';
import PagePreferences from './components/PagePreferences';

const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        element: <CreateLayout />,
        children: [
            { path: ROUTES.CREATE.PREFERENCES, element: <PagePreferences /> },
            { path: ROUTES.CREATE.KEYS, element: <Keys /> },
            { path: ROUTES.CREATE.GENERATE, element: <PageCreate /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
