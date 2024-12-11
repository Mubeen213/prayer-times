import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '../components/PublicLayout'
import { MosqueList } from '../pages/MosqueList'
import { MosqueDetail } from '../pages/MosqueDetail'

export default function PublicApp() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<MosqueList />} />
        <Route path='/mosque/:id' element={<MosqueDetail />} />
      </Route>
    </Routes>
  )
}
