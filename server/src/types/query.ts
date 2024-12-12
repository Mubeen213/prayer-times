export interface PaginationParams {
  page?: string
  limit?: string
}

export interface SearchParams {
  search?: string
}

export interface MosqueQueryParams extends PaginationParams, SearchParams {}
