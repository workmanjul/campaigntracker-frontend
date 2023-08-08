"use client";
import React, { useEffect, useState } from "react";
import { restApi } from "@/api";
import { AdAccount } from "@/src/crm/@types/adAccount";
import AdAccountSaveDialog from "@/src/crm/components/adAccount/AdAccountSaveDialog";
import AdAccountAction from "@/src/crm/components/adAccount/AdAccountAction";
import { PaginationResponse } from "@src/crm/@types/paginationResponse";
import Table from "@src/crm/components/table/Table";
import { ColumnDef } from "@tanstack/react-table";

const Page = () => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "accountId",
      header: "Account Id",
    },
    {
      accessorKey: "timeZone",
      header: "Time Zone",
    },
    {
      accessorKey: "updatedAt",
      header: "Updated Date",
    },
    {
      accessorKey: "",
      header: "Action",
      cell: (info) => {
        const row = info.row.original; // Access the row data
        return (
          <AdAccountAction
            fetchAdAccount={() => fetchAccounts(pageNumber)}
            adAccount={row}
          />
        );
      },
    },
  ];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();
  const [hasPrevious, setPrevious] = useState<boolean>();
  const [hasNext, setNext] = useState<boolean>();
  const fetchAccounts = async (page: Number) => {
    restApi
      .get<PaginationResponse<AdAccount>>(
        "/ad-accounts?page=" + page + "&pageSize=10"
      )
      .then(({ data }) => {
        setAdAccounts(data.items as AdAccount[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };

  const fetchData = (page: number) => {
    fetchAccounts(page);
  };

  useEffect(() => {
    const page = 1;
    setPageNumber(1);
    fetchAccounts(page);
  }, []);

  return (
    <>
      <title>AdAccount:Campaign Tracker</title>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Ad Account List
          </h2>
          <button
            className="btn"
            onClick={(e) => {
              setDialogOpen((prev) => !prev);
            }}
          >
            Create new AdAccount
          </button>
        </div>

        {/* <table className={"table w-full"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Id</th>
              <th>Time zone</th>
              <th>Last Updated</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {adAccounts &&
              adAccounts.map((adAccount) => {
                return (
                  <tr key={adAccount.id}>
                    <td>{adAccount.name}</td>
                    <td>{adAccount.accountId}</td>
                    <td>{adAccount.timeZone}</td>
                    <td>{adAccount.updatedDate}</td>
                    <td>
                      <AdAccountAction
                        fetchAdAccount={() => fetchAccounts(pageNumber)}
                        adAccount={adAccount}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}
        <Table
          columns={columns}
          getData={async (filters) => {
            console.log(filters);
            const result = await restApi.get("/ad-accounts", {
              params: {
                page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
                pageSize: filters.pageSize,
                sort: filters.sorting,
              },
            });
            console.log("result", result.data);
            return result.data;
          }}
        />
      </div>

      {/* <div>
        <div className="flex flex-col items-center">
          <div className="btn-group">
            {hasPrevious && (
              <button
                className="btn"
                onClick={() => {
                  fetchData(Number(pageNumber) - 1);
                }}
              >
                «
              </button>
            )}

            <button className="btn">Page {pageNumber}</button>

            {hasNext && (
              <button
                className="btn"
                onClick={() => {
                  fetchData(Number(pageNumber) + 1);
                }}
              >
                »
              </button>
            )}
          </div>
        </div>
      </div> */}

      {dialogOpen && (
        <AdAccountSaveDialog
          fetchAccounts={() => fetchAccounts(pageNumber)}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
    </>
  );
};

export default Page;
