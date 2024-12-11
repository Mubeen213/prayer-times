import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'

const AdminApp = lazy(() => import('./admin/AdminApp'))
const PublicApp = lazy(() => import('./public/publicApp'))

function App() {
  return (
    <BrowserRouter>
      <Toaster position='top-right' />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/admin/*' element={<AdminApp />} />
          <Route path='/*' element={<PublicApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
