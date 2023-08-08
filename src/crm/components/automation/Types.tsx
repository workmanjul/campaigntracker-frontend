import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleTypeChange: (id: number, value: string) => void;
  row: Row;
};

const Types = ({ handleTypeChange, row }: Props) => {
  return (
    <div className="flex-1">
      <select
        className="select select-bordered w-full max-w-xs"
        value={row.type}
        onChange={(e) => handleTypeChange(row.id, e.target.value)}
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value="number">Number</option>
        <option value="timeframe">Time Frame</option>
        <option value="percentageOfTimeFrame">% Of Time Frame</option>
        <option value="parameter">Parameter</option>
      </select>
    </div>
  );
};

export default Types;
