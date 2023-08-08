import React, {Fragment, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {AdAccount} from "@/src/crm/@types/adAccount";
import {restApi} from "@/api";
import {toast} from "react-toastify";
import { timeZone } from './timeZone';

interface Props {
    account?: AdAccount
    dialogOpen: boolean
    fetchAccounts: () => Promise<void>
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const AdAccountSaveDialog: React.FC<Props> = ({dialogOpen,fetchAccounts,setDialogOpen,account}) => {
    const {register, handleSubmit,reset, formState: {errors}} = useForm<AdAccount>();
    const isCreate = account === undefined;

    useEffect(() => {
       if (account !== undefined) {
           reset(account)
       }
    },[account])
    const onSubmit: SubmitHandler<AdAccount> =async (data) => {
        data.status = "Active"
        if (isCreate){
            await restApi.post("/ad-accounts",data)
            toast.success("Ad account created successfully")
        }else{
            await restApi.put(`/ad-accounts/${account?.id}`,data)
            toast.success("Ad account edited successfully")
        }
        setDialogOpen(false)
        await fetchAccounts()
    }
    return (
        <div>
            <input type="checkbox"  checked={dialogOpen}  style={{display:"none"}} onChange={()=>{}} readOnly={true} className="hidden modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{isCreate?"Create":"Update"} ad account</h3>
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
                                    <span className="text-base label-text">Account Id</span>
                                </label>
                                <input
                                    {...register('accountId')}
                                    type="text" placeholder="Account Id"
                                    className="w-full input input-bordered input-primary"
                                />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Time zone</span>
                                </label>
                            <select
                                {...register('timeZone')}
                                className="w-full input input-bordered input-primary"
                            >
                                {timeZone.map((zone) => (
                                <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                </option>
                                ))}
                            </select>
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

export default AdAccountSaveDialog;