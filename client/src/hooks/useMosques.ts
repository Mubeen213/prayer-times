import { useQuery } from '@tanstack/react-query'
import { api } from '../config/axios'
import { MosquesResponse } from '../types/mosque'

interface MosqueQueryParams {
  search?: string
  searchType?: 'name' | 'location'
  page?: number
  limit?: number
}

export const useMosques = (params: MosqueQueryParams = {}) => {
  const { search, searchType, page = 1, limit = 10 } = params

  return useQuery({
    queryKey: ['mosques', { search, searchType, page, limit }],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (search) searchParams.append('search', search)
      if (searchType) searchParams.append('searchType', searchType)
      searchParams.append('page', String(page))
      searchParams.append('limit', String(limit))

      const { data } = await api.get<MosquesResponse>(
        `/mosques?${searchParams.toString()}`
      )
      return data
    },
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    enabled: true,
    staleTime: 0,
  })
}
