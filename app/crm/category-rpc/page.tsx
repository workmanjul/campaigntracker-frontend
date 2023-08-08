'use client';

import { restApi } from '@api';
import { useState, useRef } from 'react';
import Table, { TableMethods } from '@src/crm/components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import CategoryRPCAction from '@src/crm/components/categoryrpc/CategoryRPCAction';
import CategoryRPCSaveDialog from '@src/crm/components/categoryrpc/CategoryRPCSaveDialog';

const Page = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const tableRef = useRef<TableMethods>(null);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
    {
      accessorKey: 'rpc',
      header: 'RPC',
    },
    {
      accessorKey: '',
      header: 'Action',
      cell: (info) => {
        const row = info.row.original; // Access the row data
        return (
          <CategoryRPCAction
            fetchCategoryRPC={async () => {
              tableRef.current?.fetchData();
            }}
            categoryRPC={row}
          />
        );
      },
    },
  ];
  return (
    <>
      <title>Category:Campaign Tracker</title>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Category List
          </h2>
          <button
            className="btn"
            onClick={(e) => {
              setDialogOpen((prev) => !prev);
            }}
          >
            Create new Category
          </button>
        </div>

        <Table
          ref={tableRef}
          columns={columns}
          getData={async (filters) => {
            console.log(filters);
            const result = await restApi.get('/category-rpc', {
              params: {
                page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
                pageSize: filters.pageSize,
                sort: filters.sorting,
              },
            });
            return result.data;
          }}
        />
      </div>
      {dialogOpen && (
        <CategoryRPCSaveDialog
          fetchCategoryRPC={async () => {
            tableRef.current?.fetchData();
          }}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};

export default Page;
