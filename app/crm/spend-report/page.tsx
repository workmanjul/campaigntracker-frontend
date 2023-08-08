"use client";

import { restApi } from "@/api";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import CampaignRowAction from "@src/crm/components/dm-reporting/CampaignRowAction";
import Table from "@src/crm/components/table/Table";
import { ColumnDef } from "@tanstack/react-table";
import dayjs, { Dayjs } from "@node_modules/dayjs";

interface DatePickerValue {
  startDate: Dayjs;
  endDate: Dayjs;
}
const columns: ColumnDef<any>[] = [
  {
    accessorKey: "reportDate",
    header: "Date",
    cell: (info) => {
      return (
        <span>{(info.getValue() as any).toString().substring(0, 10)}</span>
      );
    },
  },
  {
    accessorKey: "adset_id",
    header: "Adset",
  },
  {
    accessorKey: "adCost",
    header: "Spend",
    cell: (info) => {
      return <span>${(info.getValue() as number).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: (info) => {
      return <span>${(info.getValue() as number).toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "margin",
    header: "Margin",
    cell: (info) => {
      return <span>{(info.getValue() as number).toFixed(2)} %</span>;
    },
  },
  {
    accessorKey: "clicks",
    header: "Link clicks",
  },
];
const Page = () => {
  const [value, setValue] = useState<DatePickerValue>({
    startDate: dayjs().subtract(1, "day"),
    endDate: dayjs().subtract(0, "day"),
  });

  const [adsetId, setAdsetId] = useState<string>("");

  return (
    <>
      <title>Spend Report</title>
      <div className={"flex w-full justify-between"}>
        <div className=" ml-2">
          <input
            type="text"
            placeholder="Adset Id"
            value={adsetId}
            onChange={(e) => {
              setAdsetId(e.target.value);
            }}
            className="input w-full max-w-xs"
          />
        </div>

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
      <Table
        columns={columns}
        filters={{
          startDate: value.startDate.format("YYYY-MM-DD"),
          endDate: value.endDate.format("YYYY-MM-DD"),
          adsetId: adsetId,
        }}
        getData={async (filters) => {
          const result = await restApi.get("/campaigns/spend-report", {
            params: {
              page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
              pageSize: filters.pageSize,
              fromDate: filters.startDate,
              toDate: filters.endDate,
              sort: filters.sorting,
              adsetId: adsetId,
            },
          });

          return result.data;
        }}
      />
    </>
  );
};

export default Page;
