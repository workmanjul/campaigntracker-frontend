import React, {useState} from 'react';
import {AdAccount} from "@/src/crm/@types/adAccount";
import {restApi} from "@/api";
import {toast} from "react-toastify";
import AdAccountSaveDialog from "@/src/crm/components/adAccount/AdAccountSaveDialog";

interface Props {
    adAccount: AdAccount
    fetchAdAccount: () => Promise<void>
}
const AdAccountAction:React.FC<Props> = ({adAccount,fetchAdAccount}) => {
    const {id} = adAccount
    const [dialogOpen,setDialogOpen] = useState(false);
    const deleteAdAccount = async () => {
        if (confirm("Are you sure?")){
            await restApi.delete(`/ad-accounts/${id}`)
            toast.success("Ad account deleted successfully")
            await fetchAdAccount()
        }
    }
    const handleEditClick = () => {
        setDialogOpen(true)
    }
    return (
        <div>
            {dialogOpen && <AdAccountSaveDialog
                dialogOpen={dialogOpen}
                fetchAccounts={fetchAdAccount}
                setDialogOpen={setDialogOpen}
                account={adAccount}
              />
            }
            <button className={"btn btn-primary mr-1 btn-sm"} onClick={() => {
                    setDialogOpen(true)
                
            }}>Edit</button>
            <button className={"btn btn-error btn-sm"} onClick={deleteAdAccount}>Delete</button>
        </div>
    );
};

export default AdAccountAction;