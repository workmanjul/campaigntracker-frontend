import React, {Fragment, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {restApi} from "@/api";
import {toast} from "react-toastify";
import {User} from "@src/crm/@types/user";

interface Props {
    user?: User
    dialogOpen: boolean
    fetchUsers: () => Promise<void>
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const UserSaveDialog: React.FC<Props> = ({dialogOpen,fetchUsers,setDialogOpen,user}) => {
    const {register, handleSubmit,reset, formState: {errors}} = useForm<User>();
    const isCreate = user === undefined;

    useEffect(() => {
       if (user !== undefined) {
           reset(user)
       }
    },[user])
    const onSubmit: SubmitHandler<User> =async (formData) => {
        if (isCreate){
            const {data} = await restApi.post("/users",formData)
            toast.success(data.message)
        }else{
            const {data} =  await restApi.put(`/users/${user?.id}`,formData)
            toast.success(data.message)
        }
        setDialogOpen(false)
        await fetchUsers()
    }
    return (
        <div>
            <input type="checkbox"  checked={dialogOpen}  style={{display:"none"}} onChange={()=>{}} readOnly={true} className="hidden modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{isCreate?"Create":"Update"} User</h3>
                    <form action={""}  className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Name</span>
                                </label>
                                <input
                                    {...register('name')}
                                    type="text" placeholder="Name"
                                    className="w-full input input-bordered input-primary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Email</span>
                                </label>
                                <input
                                    {...register('email')}
                                    type="text" placeholder="Email"
                                    className="w-full input input-bordered input-primary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Password</span>
                                </label>
                                <input
                                    {...register('password')}
                                    type="password" placeholder="Password"
                                    className="w-full input input-bordered input-primary"
                                />
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button className="btn btn-error" type={"button"} onClick={() =>{setDialogOpen(false)}}>
                                Close
                            </button>
                            <button className="btn btn-primary" type={"submit"}>
                                {isCreate?"Create":"Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserSaveDialog;