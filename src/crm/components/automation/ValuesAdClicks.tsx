import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const ValuesAdClicks = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter AdClicks"
        className="input input-bordered w-full max-w-xs"
        value={row.valuesAdclicks}
        onChange={(e) =>
          handleOptionChange(row.id, e.target.value, 'valuesAdclicks')
        }
      />
    </div>
  );
};

export default ValuesAdClicks;
