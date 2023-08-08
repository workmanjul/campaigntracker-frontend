import React, { useState } from "react";

import { AdSets } from "@src/crm/@types/adSets";
import AdsetsDialog from "./adSetsDialog";

interface Props {
  adSets: AdSets;
}

const AdsetsAction: React.FC<Props> = ({ adSets }) => {
  console.log("adsetsss", adSets);
  const { id } = adSets;
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div>
      {dialogOpen && (
        <AdsetsDialog
          adSets={adSets}
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
export default AdsetsAction;
