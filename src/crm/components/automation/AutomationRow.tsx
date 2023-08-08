import React, { useState } from 'react';
import { restApi } from '@api';
import { Automation } from '@src/crm/@types/automation';
import AutomationNewDialog from '@src/crm/components/automation/AutomationNewDialog';
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

interface Props {
  automation: Automation;
  fetchAutomations:any
}
const AutomationRow: React.FC<Props> = ({ automation,fetchAutomations }) => {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteAutomation = (id: string) => {
  restApi.delete(`/automation/${id}`).then((response) => {
      fetchAutomations()
      toast.success("Automation deleted  successfully")
    });  };
  return (
    <div>
      {dialogOpen && (
        <AutomationNewDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          automation={automation}
          fetchAutomations={fetchAutomations}
        />
      )}
      <button
        className="btn btn-primary mr-1 btn-sm"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Edit
      </button>
      <button
        className={'btn btn-error btn-sm'}
        onClick={() => {
          const confirm = window.confirm("Arey You Sure To Delete?")
          if(confirm){
            deleteAutomation(automation.id)}}

          }
      >
        Delete
      </button>
    </div>
  );
};

export default AutomationRow;
