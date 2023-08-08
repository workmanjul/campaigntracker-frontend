import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const PercentageOfTimeFrame = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter percentage"
        className="input input-bordered w-full max-w-xs"
        value={row.percentageOfTimeFrame}
        onChange={(e) =>
          handleOptionChange(row.id, e.target.value, 'percentageOfTimeFrame')
        }
      />
    </div>
  );
};

export default PercentageOfTimeFrame;
