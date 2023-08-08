'use client';

import { restApi } from '@api';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AutomationLog } from '@src/crm/@types/automationlog';
import { PaginationResponse } from '@src/crm/@types/paginationResponse';
import Table from '@src/crm/components/table/Table';
import { ColumnDef } from '@tanstack/react-table';
import dayjs, { Dayjs } from '@node_modules/dayjs';
import Datepicker from 'react-tailwindcss-datepicker';

interface DatePickerValue {
  startDate: Dayjs;
  endDate: Dayjs;
}

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'automationId',
    header: 'Id',
    cell: (info) => {
      return <span>{info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'adset_id',
    header: 'AdSet Id',
    cell: (info) => {
      return <span>{info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'rules',
    header: 'Rule',
    cell: (info) => {
      return <span>{info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: (info) => {
      return <span>{info.getValue() as any}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Last Run',
    cell: (info) => {
      return <span>{info.getValue() as any}</span>;
    },
  },
];
const Page = () => {
  const [value, setValue] = useState<DatePickerValue>({
    startDate: dayjs().subtract(1, 'day'),
    endDate: dayjs().subtract(0, 'day'),
  });
  const handleValueChange = (newValue: any) => {
    restApi
      .get<PaginationResponse<AutomationLog>>(
        '/automationlog?page=' +
          1 +
          '&pageSize=10' +
          '&formDate=' +
          newValue.startDate +
          '&toDate=' +
          newValue.endDate,
      )
      .then(({ data }) => {
        setAutomationLog(data.items as AutomationLog[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };
  const [automationLog, setAutomationLog] = useState<AutomationLog[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();
  const [hasPrevious, setPrevious] = useState<boolean>();
  const [hasNext, setNext] = useState<boolean>();

  const fetchedAutomationlogData = async (page: number) => {
    restApi
      .get<PaginationResponse<AutomationLog>>(
        '/automationlog?page=' + page + '&pageSize=10',
      )
      .then(({ data }) => {
        setAutomationLog(data.items as AutomationLog[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };
  const fetchData = (page: number) => {
    fetchedAutomationlogData(page);
  };

  useEffect(() => {
    const page = 1;
    setPageNumber(1);
    fetchedAutomationlogData(page);
  }, []);

  return (
    <>
      <ToastContainer />
      <title>AutomationLog:Campaign Tracker</title>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end ">
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
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            AutomationLog List
          </h2>
        </div>
        <div>
          <Table
            columns={columns}
            filters={{}}
            getData={async (filters) => {
              const result = await restApi.get('/automationlog', {
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
      </div>
    </>
  );
};
export default Page;
