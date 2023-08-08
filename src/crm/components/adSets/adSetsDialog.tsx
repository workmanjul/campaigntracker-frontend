import { AdSets } from "@src/crm/@types/adSets";
import React from "react";

interface Props {
  adSets: AdSets;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdsetsDialog = ({ adSets, dialogOpen, setDialogOpen }: Props) => {
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={dialogOpen}
          style={{ display: "none" }}
          onChange={() => {}}
          readOnly={true}
          className="hidden modal-toggle"
        />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">User</h3>
            <form action={""} className="space-y-4">
              <div className="py-4">
                <div>
                  <label className="label">
                    <span className="text-base label-text">Name</span>
                    {adSets.name}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">AdAccount</span>
                    {adSets.adaccount_id}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Status</span>
                    {adSets.status}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Adset ID</span>
                    {adSets.adset_id}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Created At</span>
                    {adSets.createdAt}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">CreatedTime</span>
                    {adSets.created_time}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Start Time</span>
                    {adSets.start_time}
                  </label>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-errot"
                  type="button"
                  onClick={() => {
                    setDialogOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdsetsDialog;
