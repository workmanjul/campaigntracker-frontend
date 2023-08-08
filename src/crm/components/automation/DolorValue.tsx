import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const DolorValue = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter amount"
        className="input input-bordered w-full max-w-xs"
        value={row.dollarValue}
        onChange={(e) =>
          handleOptionChange(row.id, e.target.value, 'dollarValue')
        }
      />
    </div>
  );
};

export default DolorValue;
