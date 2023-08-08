'use client';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { JSX } from 'react';
import { MdOutlineAccountTree, MdOutlineSpaceDashboard } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';

interface menuItems {
  title: string;
  to: string;
  icon: JSX.Element;
}

const Menus: menuItems[] = [
  {
    title: 'Dashboard',
    to: '/crm/dashboard',
    icon: <MdOutlineSpaceDashboard />,
  },
  {
    title: 'Ad Accounts',
    to: '/crm/ad-accounts',
    icon: <MdOutlineAccountTree />,
  },
  {
    title: 'Users',
    to: '/crm/user',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'DM Reporting',
    to: '/crm/dm-reporting',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'AdSets',
    to: '/crm/ad-sets',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'Automation',
    to: '/crm/automation',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'Daily Report',
    to: '/crm/spend-report',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'Automation Log',
    to: '/crm/automationlog',
    icon: <HiOutlineUsers />,
  },
  {
    title: 'CategoryRPC',
    to: '/crm/category-rpc',
    icon: <HiOutlineUsers />,
  },
];
const Sidebar = () => {
  return (
    <div className={`duration-300 h-screen p-5 pt-8 bg-dark-purple relative `}>
      <div className="flex gap-x-5 pl-1 items-center">
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 hidden 800px:block`}
        >
          Campaign Tracker
        </h1>
      </div>
      <div className="">
        <ul className="pt-6">
          {Menus &&
            Menus.map((menu, index) => (
              <li
                className={`text-gray-300 text-sm flex justify-start gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md`}
                key={index}
              >
                <Link href={menu.to} className="flex items-center gap-x-4">
                  <IconContext.Provider value={{ size: '32', color: 'white' }}>
                    {menu.icon}
                  </IconContext.Provider>
                  <span
                    className={`hidden 800px:block origin-left duration-200 text-white`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
