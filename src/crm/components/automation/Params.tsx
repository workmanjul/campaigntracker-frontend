import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const Params = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <select
        className="select select-bordered w-full max-w-xs"
        id={`select1${row.id}`}
        value={row.param}
        onChange={(e) => {
          handleOptionChange(row.id, e.target.value, 'param');
        }}
      >
        <option value="" disabled>
          Select Params
        </option>
        <option value="adset_age">AdSet Age</option>
        <option value="ad_clicks">Ad Clicks</option>
        <option value="budget_adjustment">Last Budget Adjustment</option>
        <option value="current_budget">Current Budget</option>
        <option value="margin">Margin</option>
        <option value="profit">Gross Profit</option>
        <option value="rpc">RPC</option>
        <option value="average_rpc">Average RPC</option>
        <option value="category_rpc">Category RPC</option>
      </select>
    </div>
  );
};

export default Params;
