import React, {useState} from 'react';
import {restApi} from "@/api";
import {toast} from "react-toastify";
import UserSaveDialog from "@src/crm/components/user/UserSaveDialog";
import {User} from "@src/crm/@types/user";

interface Props {
    user: User
    fetchUser: () => Promise<void>
}
const UserRowAction:React.FC<Props> = ({user,fetchUser}) => {
    const {id} = user
    const [dialogOpen,setDialogOpen] = useState(false);
    const deleteAdAccount = async () => {
        if (confirm("Are you sure?")){
            await restApi.delete(`/users/${id}`)
            toast.success("User deleted successfully")
            await fetchUser()
        }
    }
    const handleEditClick = () => {
        setDialogOpen(true)
    }
    return (
        <div>
            {dialogOpen && <UserSaveDialog
                dialogOpen={dialogOpen}
                fetchUsers={fetchUser}
                setDialogOpen={setDialogOpen}
                user={user}
              />
            }
            <button className={"btn btn-primary mr-1 btn-sm"} onClick={() => {
                    setDialogOpen(true)
                
            }}>Edit</button>
            <button className={"btn btn-error btn-sm"} onClick={deleteAdAccount}>Delete</button>
        </div>
    );
};

export default UserRowAction;