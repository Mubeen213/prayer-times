import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '../components/PublicLayout'
import { MosqueDetail } from '../components/MosqueDetail'
import { MosquePage } from '../pages/MosquePage'

export default function PublicApp() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<MosquePage />} />
        <Route path='/mosque/:id' element={<MosqueDetail />} />
      </Route>
    </Routes>
  )
}
