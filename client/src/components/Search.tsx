// src/components/Search.tsx
import { useState, useEffect, useMemo } from 'react'

// Define the SearchProps type
interface SearchProps {
  onSearch: (query: string, type: 'name' | 'location') => void
  isLoading: boolean
}
import debounce from 'lodash/debounce'

export const Search = ({ onSearch }: SearchProps) => {
  const [searchType, setSearchType] = useState<'name' | 'location'>('name')
  const [searchQuery, setSearchQuery] = useState('')

  // Single debounced function with useMemo
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string, type: 'name' | 'location') => {
        console.log('Debounced search:', { query, type })
        onSearch(query, type)
      }, 300),
    [onSearch]
  )

  // Handle input change directly
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    debouncedSearch(query, searchType)
  }

  // Handle type change directly
  const handleTypeChange = (type: 'name' | 'location') => {
    setSearchType(type)
    if (searchQuery) {
      debouncedSearch(searchQuery, type)
    }
  }

  // Cleanup only
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <div className='mb-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white rounded-lg shadow-sm p-4'>
          <div className='flex gap-3 sm:gap-2 mb-4'>
            {['name', 'location'].map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type as 'name' | 'location')}
                className={`flex-1 py-2 sm:py-2 px-2 rounded-md transition text-base sm:text-sm font-medium ${
                  searchType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                Search by {type}
              </button>
            ))}
          </div>
          <div className='relative'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full p-3 rounded-md border focus:ring-2 focus:ring-green-500'
              placeholder={`Search mosque by ${searchType}...`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
