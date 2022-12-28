import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './constants';
import CreateLayout from './layouts/create';
import Generate from './pages/Generate';
import Keys from './pages/Keys';
import PreferencesPage from './pages/Preferences';

const router = createBrowserRouter([
    {
        path: routes.root,
        element: <CreateLayout />,
        children: [
            { path: routes.create.preferences, element: <PreferencesPage /> },
            { path: routes.create.keys, element: <Keys /> },
            { path: routes.create.generate, element: <Generate /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
