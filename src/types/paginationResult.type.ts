export interface IPaginationResult<T> {
  items: T[];
  page: number;
  pagesCount: number;
  documentsCount: number;
}

export const emptyPagination = {
  items: [],
  page: 1,
  pagesCount: 0,
  documentsCount: 0,
};
