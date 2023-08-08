import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const PercentValue = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter percentage"
        className="input input-bordered w-full max-w-xs"
        value={row.percentValue}
        onChange={(e) =>
          handleOptionChange(row.id, e.target.value, 'percentValue')
        }
      />
    </div>
  );
};

export default PercentValue;
