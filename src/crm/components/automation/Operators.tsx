import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const Operators = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <select
        className="select select-bordered w-full max-w-xs"
        value={row.operand}
        onChange={(e) => handleOptionChange(row.id, e.target.value, 'operand')}
      >
        <option value="" disabled>
          Select Operators
        </option>
        <option value="<">Less Than</option>
        <option value=">">Greater Than</option>
        <option value="=">Equals</option>
        <option value="<=">Less Than Or Equal</option>
        <option value=">=">Greater Than Or Equal</option>
      </select>
    </div>
  );
};

export default Operators;
