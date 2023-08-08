import { Row } from '@src/crm/@types/Row';
import React from 'react';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const BudgetAdjustmentDays = ({ handleOptionChange, row }: Props) => {
  return (
    <div className="flex-1">
      <input
        type="text"
        placeholder="Enter Days"
        className="input input-bordered w-full max-w-xs"
        value={row.budgetAdjustment}
        onChange={(e) =>
          handleOptionChange(row.id, e.target.value, 'budgetAdjustment')
        }
      />
    </div>
  );
};

export default BudgetAdjustmentDays;
