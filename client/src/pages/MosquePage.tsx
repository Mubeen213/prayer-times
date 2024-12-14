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

  if (isLoading) {
    return (
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='bg-white rounded-lg shadow-sm p-6 animate-pulse'
          >
            <div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <Search onSearch={handleSearch} isLoading={isLoading} />
      <MosqueList mosques={data?.mosques || []} isLoading={isLoading} />
    </div>
  )
}
