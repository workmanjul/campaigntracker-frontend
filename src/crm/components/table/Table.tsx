import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

interface Props {
  columns: ColumnDef<any>[];
  filters?: object;
  getData: (filters: any) => Promise<{
    items: any[];
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }>;
}

interface ChildProps extends Props {}
export interface TableMethods {
  fetchData: () => Promise<void>;
}

const Table = forwardRef<TableMethods, ChildProps>(
  ({ getData, columns, filters = {} }, ref) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrev, setHasPrev] = useState(false);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [{ pageIndex, pageSize }, setPagination] =
      React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
      });
    const strFilter = JSON.stringify(filters);
    const fetchDataInner = async (
      iLoading: boolean,
      iSorting: SortingState,
      iPageIndex: number,
      iPageSize: number,
      iFilters: object,
    ) => {
      if (iLoading) {
        return;
      }
      let innerSort = {};
      if (iSorting.length > 0) {
        innerSort = sorting[0];
      }
      setIsLoading(true);
      getData({
        pageIndex: iPageIndex,
        pageSize: iPageSize,
        sorting: innerSort,
        ...iFilters,
      })
        .then((res) => {
          setData(res.items);
          setTotalItems(res.totalItems);
          setHasNext(res.hasNext);
          setHasPrev(res.hasPrevious);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    const fetchCached = useCallback(() => {
      if (loading) {
        return;
      }
      setIsLoading(true);
      let innerSort = {};
      if (sorting.length > 0) {
        innerSort = sorting[0];
      }
      getData({
        pageIndex: pageIndex,
        pageSize: pageSize,
        sorting: innerSort,
        ...filters,
      })
        .then((res) => {
          setData(res.items);
          setTotalItems(res.totalItems);
          setHasNext(res.hasNext);
          setHasPrev(res.hasPrevious);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [loading, pageSize, filters, getData, pageIndex, sorting]);
    useImperativeHandle(ref, () => ({
      async fetchData() {
        fetchCached();
      },
    }));

    useEffect(() => {
      fetchCached();
    }, [pageSize, strFilter, pageIndex, sorting]);

    const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      manualSorting: true,
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
      enableMultiSort: false,
      state: {
        sorting,
      },
    });

    return (
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                {table.getFlatHeaders().map((header) => {
                  const isSorted = sorting.find((s) => s.id === header.id);
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={'cursor-pointer select-none'}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {isSorted === undefined
                            ? null
                            : isSorted.desc
                            ? '🔽'
                            : '🔼'}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={'w-full mt-2'}>
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="pt-1 pb-1 px-4  bg-white w-40 text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center"
                >
                  <option value={10}>10 items</option>
                  <option value={20}>20 items</option>
                  <option value={50}>50 items</option>
                </select>
                <p className="text-gray-500 mt-4 lg:mt-0">
                  Showing {pageIndex * pageSize} to {(pageIndex + 1) * pageSize}{' '}
                  of {totalItems} entires
                </p>
              </div>
              <nav
                aria-label="Pagination"
                className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0"
              >
                <button
                  onClick={() => {
                    table.setPageIndex(pageIndex - 1);
                  }}
                  className={
                    !hasPrev
                      ? 'btn btn-ghost btn-disabled btn-sm'
                      : 'btn btn-ghost btn-sm'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    table.setPageIndex(pageIndex + 1);
                  }}
                  className={
                    !hasNext
                      ? 'btn btn-ghost btn-disabled btn-sm'
                      : 'btn btn-ghost btn-sm'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
Table.displayName = 'Table';

export default Table;
