// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

const AdminApp = lazy(() => import('./admin/AdminApp'))
const PublicApp = lazy(() => import('./public/publicApp'))

const router = createBrowserRouter([
  {
    path: '/admin/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminApp />
      </Suspense>
    ),
  },
  {
    path: '/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PublicApp />
      </Suspense>
    ),
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right' />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
