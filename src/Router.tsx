import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { Login } from './pages/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/home',
        element: <Home />,
    },
]);

export function Router() {
    return <RouterProvider router={router} />;
}
