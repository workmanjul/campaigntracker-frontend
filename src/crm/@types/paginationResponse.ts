export interface PaginationResponse<T> {
    items: T[] | null;
    totalItems: number | null;
    page: number | null;
    hasPrevious: boolean| null;
    hasNext: boolean | null;
  }