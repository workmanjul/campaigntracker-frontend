'use client';

import { restApi } from '@/api';
import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import CampaignRowAction from '@src/crm/components/dm-reporting/CampaignRowAction';
import Table from '@src/crm/components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import dayjs, { Dayjs } from '@node_modules/dayjs';

interface DatePickerValue {
  startDate: Dayjs;
  endDate: Dayjs;
}

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'start_time',
    header: 'Date',
  },
  {
    accessorKey: 'adset_id',
    header: 'Adset',
  },
  {
    accessorKey: 'spend',
    header: 'Spend',
    cell: (info) => {
      return <span>${info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: (info) => {
      return <span>${info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
    cell: (info) => {
      return <span>${info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'link_clicks',
    header: 'Link clicks',
  },
  {
    accessorKey: '&nbsp;',
    header: 'Details',
    cell: (info) => {
      return (
        <span>
          <CampaignRowAction campaign={info.row.original as any} />
        </span>
      );
    },
  },
];
const Page = () => {
  const [value, setValue] = useState<DatePickerValue>({
    startDate: dayjs().subtract(1, 'day'),
    endDate: dayjs().subtract(0, 'day'),
  });
  console.log(value.startDate);
  return (
    <>
      <title>DM-Reporting:Campaign Tracker</title>
      <div className={'w-[20%]'}>
        <Datepicker
          showShortcuts={true}
          value={{
            startDate: value.startDate?.toDate(),
            endDate: value.endDate?.toDate(),
          }}
          onChange={(v) => {
            setValue({
              startDate: dayjs(v?.startDate),
              endDate: dayjs(v?.endDate),
            });
          }}
        />
      </div>
      <Table
        columns={columns}
        filters={{
          startDate: value.startDate.format('YYYY-MM-DD'),
          endDate: value.endDate.format('YYYY-MM-DD'),
        }}
        getData={async (filters) => {
          const result = await restApi.get('/campaigns', {
            params: {
              page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
              pageSize: filters.pageSize,
              fromDate: filters.startDate,
              toDate: filters.endDate,
            },
          });
          return result.data;
        }}
      />
    </>
  );
};

export default Page;
