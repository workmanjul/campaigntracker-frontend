import { Campaign } from "@src/crm/@types/campaign";
import React from "react";
interface Props {
  campaign: Campaign;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CampaignDialog = ({ campaign, dialogOpen, setDialogOpen }: Props) => {
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
            <h3 className="font-bold text-lg">DM Reporting Details</h3>
            <form action={""} className="space-y-4">
              <div className="py-4">
              <div>
                  <label className="label">
                    <span className="text-base label-text">Adset Id</span>
                    {campaign.adset_id}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Advertiser</span>
                    {campaign.advertiser}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Domain</span>
                    {campaign.domain}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Manager</span>
                    {campaign.manager}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Buyer</span>
                    {campaign.buyer}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Hour</span>
                    {campaign.start_time}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Campaign</span>
                    {campaign.campaign}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">AdSet</span>
                    {campaign.adset}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Revenue</span>
                    {campaign.revenue}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Spend</span>
                    {campaign.spend}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Link Clicks</span>
                    {campaign.link_clicks}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Ad Clicks</span>
                    {campaign.ad_clicks}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Gross Profit</span>
                    {campaign.gp}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Searches</span>
                    {campaign.searches}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Clicks</span>
                    {campaign.clicks}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">TQ</span>
                    {campaign.tq}
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="text-base label-text">Start Time</span>
                    {campaign.start_time}
                  </label>
                </div>

                <div></div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-error"
                  type={"button"}
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

export default CampaignDialog;