import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const Parameters = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <select
        className="select select-bordered w-full max-w-xs"
        value={row.parameters}
        onChange={(e) => {
          handleOptionChange(row.id, e.target.value, 'parameters');
        }}
      >
        <option value="" disabled>
          Select Params
        </option>
        <option value="rpc">RPC</option>
        <option value="average_rpc">Average RPC</option>
        <option value="category_rpc">Category RPC</option>
      </select>
    </div>
  );
};

export default Parameters;
