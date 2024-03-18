import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './Navbar.css';
import Home from './Home';
import RootLayout from '../pages/Layout';
import Settings from '../pages/Settings';
import ErrorPage from '../pages/ErrorPage';

function Navbar() {
  const router = createBrowserRouter([
    { path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: '/', element: <Home />},
        { path: '/settings', element: <Settings />}
      ]
    }
  ]);

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default Navbar
