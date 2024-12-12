import { Search } from '../components/Search'
import { MosqueList } from '../components/MosqueList'
import { useMosques } from '../hooks/useMosques'
import { useState } from 'react'

export const MosquePage = () => {
  const [searchParams, setSearchParams] = useState<{
    query?: string
    type?: 'name' | 'location'
  }>({})

  const { data, isLoading } = useMosques({
    search: searchParams.query,
    searchType: searchParams.type,
    limit: 10,
  })

  const handleSearch = (query: string, type: 'name' | 'location') => {
    setSearchParams({ query, type })
  }

  return (
    <div>
      <Search onSearch={handleSearch} isLoading={isLoading} />
      <MosqueList mosques={data?.mosques || []} isLoading={isLoading} />
    </div>
  )
}
