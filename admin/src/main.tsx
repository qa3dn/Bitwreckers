import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { PageEdit } from './pages/PageEdit'
import { PageNew } from './pages/PageNew'
import { MediaPage } from './pages/Media'
import { NavigationPage } from './pages/Navigation'
import { SettingsPage } from './pages/Settings'
import { SolutionsPage } from './pages/Solutions'
import { ServicesPage } from './pages/Services'
import { StudentsPage } from './pages/Students'
import { ProductsPage } from './pages/Products'

const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/login', element: <Login /> },
  { path: '/pages/new', element: <PageNew /> },
  { path: '/pages/:id', element: <PageEdit /> },
  { path: '/media', element: <MediaPage /> },
  { path: '/navigation', element: <NavigationPage /> },
  { path: '/settings', element: <SettingsPage /> },
  { path: '/solutions', element: <SolutionsPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/students', element: <StudentsPage /> },
  { path: '/products', element: <ProductsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


