import React, { useState } from "react";
import { Campaign } from "@src/crm/@types/campaign";
import CampaignDialog from "./CampaignDialog";

interface Props {
  campaign: Campaign;
}
const CampaignRowAction: React.FC<Props> = ({ campaign }) => {
  const { id } = campaign;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      {dialogOpen && (
        <CampaignDialog
          campaign={campaign}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      )}
      <button
        className={"btn btn-primary mr-1 btn-sm"}
        onClick={() => setDialogOpen((prev) => !prev)}
      >
        View
      </button>
    </div>
  );
};

export default CampaignRowAction;