import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, type: string) => void;
  row: Row;
};

const DaysAgo = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter days"
        className="input input-bordered w-full max-w-xs"
        value={row.daysAgo}
        onChange={(e) => handleOptionChange(row.id, e.target.value, 'daysAgo')}
      />
    </div>
  );
};

export default DaysAgo;
