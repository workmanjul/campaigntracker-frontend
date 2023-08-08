'use client';
import { restApi } from '@api';
import { Automation } from '@src/crm/@types/automation';
import React, { useEffect, useState } from 'react';
import { PaginationResponse } from '@src/crm/@types/paginationResponse';
import AutomationNewDialog from '@src/crm/components/automation/AutomationNewDialog';
import AutomationRow from '@src/crm/components/automation/AutomationRow';
import { ToastContainer } from 'react-toastify';

const Page = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [automationDialogOpen, setAutomationDialogOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();
  const [hasPrevious, setPrevious] = useState<boolean>();
  const [hasNext, setNext] = useState<boolean>();
  const fetchAutomations = () => {
    restApi
      .get<PaginationResponse<Automation>>('/automation')
      .then((response) => {
        setAutomations(response.data.items as Automation[]);
        setPageNumber(response.data.page as number);
        setTotalItems(response.data.totalItems as number);
        setPrevious(response.data.hasPrevious as boolean);
        setNext(response.data.hasNext as boolean);
      });
  };
  

  useEffect(() => {
    fetchAutomations();
  }, []);
  
  return (
    <>
      <ToastContainer />
      <title>Automation:Campaign Tracker</title>
      {automationDialogOpen && (
        <AutomationNewDialog
          dialogOpen={automationDialogOpen}
          setDialogOpen={setAutomationDialogOpen}
          fetchAutomations={fetchAutomations}
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Automation List
          </h2>
          <button
            className="btn"
            onClick={() => {
              setAutomationDialogOpen(true);
            }}
          >
            Create new automation
          </button>
        </div>
        <div className="h-[80vh]">
          <table className={'table w-full overflow-x-scroll'}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Last Run</th>
                <th>Rules</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {automations &&
                automations.map((automation) => (
                  <tr key={automation.id}>
                    <td>{automation.id}</td>
                    <td>{automation.name}</td>
                    <td>{automation.lastRun}</td>
                    <td>
                      <ul>
                        
                        {(automation.rules).map((rule, index) => (
                          <li key={index}>{rule.displayText}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{automation.status.toUpperCase()}</td>
                    <td>
                      <AutomationRow
                        automation={automation}
                        fetchAutomations={fetchAutomations}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
