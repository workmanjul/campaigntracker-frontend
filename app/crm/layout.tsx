"use client";
import "./../globals.css";
import "react-toastify/dist/ReactToastify.min.css";

import Sidebar from "@/src/crm/components/sidebar";
import React,{useState} from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "@api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const[errorMessage,setErrorMessage] = useState("")
  const router = useRouter();

  const handleLogout = async()=>{
    setErrorMessage("");
    try{
      await axios.get(`${BASE_URL}/auth/logout`,{withCredentials:true});
      router.push("/login");
    }catch(e:any){
      setErrorMessage(e.response.message);
    }
  }
  return (
    <div className="drawer drawer-mobile">
      <ToastContainer />
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col ">
        <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
          <div className={""}></div>
          <div className="order-last">
            <div className="dropdown dropdown-end ml-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" alt="profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <div className="divider mt-0 mb-0" />
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto pt-8 px-6  bg-base-200">
          {children}
        </main>
      </div>
      <div className="drawer-side ">
        <ul className="menu w-60 bg-base-100 text-base-content">
          <Sidebar />
        </ul>
      </div>
    </div>
  );
}