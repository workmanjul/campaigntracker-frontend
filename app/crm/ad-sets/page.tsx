"use client";

import { restApi } from "@api";
import { useState, useEffect } from "react";    
import { ToastContainer } from "react-toastify";
import { AdSets } from "@src/crm/@types/adSets";
import { PaginationResponse } from "@src/crm/@types/paginationResponse";
import AdsetsAction from "@src/crm/components/adSets/adSetsAction";
import Pagination from "@src/crm/components/Pagination/Pagination";
import Datepicker from "react-tailwindcss-datepicker";
import Table from "@src/crm/components/table/Table";
import { ColumnDef } from "@tanstack/react-table";
import dayjs, { Dayjs } from "@node_modules/dayjs";

interface DatePickerValue {
  startDate: Dayjs;
  endDate: Dayjs;
}
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "adset_id",
    header: "Adset Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "daily_budget",
    header: "Daily Budget",
    cell: (info) => {
      return <span>${(info.getValue() as number).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "",
    header: "Action",
    cell: (info) => {
      const row = info.row.original; // Access the row data
      return <AdsetsAction adSets={row} />;
    },
  },
];

const Page = () => {
  const [value, setValue] = useState<DatePickerValue>({
    startDate: dayjs().subtract(1, "day"),
    endDate: dayjs().subtract(0, "day"),
  });

  const handleValueChange = (newValue: any) => {
    restApi
      .get<PaginationResponse<AdSets>>(
        "/ad-sets?page=" +
          1 +
          "&pageSize=10" +
          "&fromDate=" +
          newValue.startDate +
          "&toDate=" +
          newValue.endDate
      )
      .then(({ data }) => {
        setAdSets(data.items as AdSets[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };

  const [adSets, setAdSets] = useState<AdSets[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();
  const [hasPrevious, setPrevious] = useState<boolean>();
  const [hasNext, setNext] = useState<boolean>();

  const fetchedAdsetsData = async (page: number) => {
    restApi
      .get<PaginationResponse<AdSets>>("/ad-sets?page=" + page + "&pageSize=10")
      .then(({ data }) => {
        setAdSets(data.items as AdSets[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };

  const fetchData = (page: number) => {
    fetchedAdsetsData(page);
  };

  useEffect(() => {
    const page = 1;
    setPageNumber(1);
    fetchedAdsetsData(page);
  }, []);

  return (
    <>
      <ToastContainer />
      <title>Adsets:Campaign Tracker</title>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end ">
          <div className={"w-[20%]"}>
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
            AdSets List
          </h2>
        </div>
        <div>
          <Table
            columns={columns}
            filters={{
              startDate: value.startDate.format("YYYY-MM-DD"),
              endDate: value.endDate.format("YYYY-MM-DD"),
            }}
            getData={async (filters) => {
              console.log(filters);
              const result = await restApi.get("/ad-sets", {
                params: {
                  page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
                  pageSize: filters.pageSize,
                  fromDate: filters.startDate,
                  toDate: filters.endDate,
                  sort: filters.sorting,
                },
              });
              console.log("result", result);
              return result.data;
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Page;
