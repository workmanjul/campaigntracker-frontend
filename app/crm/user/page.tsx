"use client";

import { restApi } from "@/api";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import UserSaveDialog from "@src/crm/components/user/UserSaveDialog";
import UserRowAction from "@src/crm/components/user/UserRowAction";
import { User } from "@src/crm/@types/user";
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
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "",
      header: "Action",
      cell: (info) => {
        const row = info.row.original; // Access the row data
        return (
          <UserRowAction
            user={row}
            fetchUser={() => fetchUserData(pageNumber)}
          />
        );
      },
    },
  ];
  const [users, setUsers] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();
  const [hasPrevious, setPrevious] = useState<boolean>();
  const [hasNext, setNext] = useState<boolean>();
  const [open, setOpen] = useState<boolean>(false);

  const fetchUserData = async (page: number) => {
    restApi
      .get<PaginationResponse<User>>("/users?page=" + page + "&pageSize=10")
      .then(({ data }) => {
        setUsers(data.items as User[]);
        setPageNumber(data.page as number);
        setTotalItems(data.totalItems as number);
        setPrevious(data.hasPrevious as boolean);
        setNext(data.hasNext as boolean);
      });
  };
  const fetchData = (page: number) => {
    fetchUserData(page);
  };

  useEffect(() => {
    const page = 1;
    setPageNumber(1);
    fetchUserData(page);
  }, []);

  return (
    <>
      <ToastContainer />
      <title>User:Campaign Tracker</title>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800 mb-4">User List</h2>
          <button
            className="btn"
            onClick={(e) => {
              setOpen((prev) => !prev);
            }}
          >
            Create new User
          </button>
        </div>
        <div className="h-[80vh]">
          <Table
            columns={columns}
            getData={async (filters) => {
              console.log(filters);
              const result = await restApi.get("/users", {
                params: {
                  page: filters.pageIndex == 0 ? 1 : filters.pageIndex,
                  pageSize: filters.pageSize,
                  sort: filters.sorting,
                },
              });
              console.log("result", result);
              return result.data;
            }}
          />
        </div>
      </div>
      <div></div>
      {open && (
        <UserSaveDialog
          dialogOpen={open}
          fetchUsers={() => fetchUserData(pageNumber)}
          setDialogOpen={setOpen}
        />
      )}
    </>
  );
};

export default Page;
