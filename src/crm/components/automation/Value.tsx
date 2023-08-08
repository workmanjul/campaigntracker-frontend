import { Row } from '@src/crm/@types/Row';
import React from 'react';
import DaysValue from './DaysAgoValue';
import DolorValue from './DolorValue';
import PercentValue from './PercentValue';
import DaysAgoValue from './DaysAgoValue';
import ValuesAdclicks from './ValuesAdClicks';
import BudgetAdjustmentDays from './BudgetAdjustmentDays';
import Parameters from './Parameters';
import PercentageOfTimeFrame from './PercentageOfTimeFrame';
import DaysOfTimeFrame from './DaysOfTimeFrame';

type Props = {
  handleOptionChange: (id: number, value: string, field: keyof Row) => void;
  row: Row;
};

const Value = ({ handleOptionChange, row }: Props) => {
  return (
    <>
      {row.param === 'adset_age' && (
        <DaysValue handleOptionChange={handleOptionChange} row={row} />
      )}
      {row.param === 'budget_adjustment' && (
        <BudgetAdjustmentDays
          handleOptionChange={handleOptionChange}
          row={row}
        />
      )}

      {row.param === 'current_budget' && (
        <DolorValue handleOptionChange={handleOptionChange} row={row} />
      )}
      {row.param === 'ad_clicks' && (
        <ValuesAdclicks handleOptionChange={handleOptionChange} row={row} />
      )}
      {(row.param === 'average_rpc' ||
        row.param === 'category_rpc' ||
        row.param === 'rpc') &&
        row.type === 'parameter' && (
          <Parameters handleOptionChange={handleOptionChange} row={row} />
        )}
      {row.param === 'margin' && row.type === 'percentageOfTimeFrame' && (
        <>
          <PercentageOfTimeFrame
            handleOptionChange={handleOptionChange}
            row={row}
          />
          <DaysOfTimeFrame handleOptionChange={handleOptionChange} row={row} />
        </>
      )}
      {row.param === 'margin' && row.type === 'number' && (
        <PercentValue handleOptionChange={handleOptionChange} row={row} />
      )}
      {row.param === 'margin' && row.type === 'timeframe' && (
        <DaysValue handleOptionChange={handleOptionChange} row={row} />
      )}
      {row.param === 'profit' && row.type === 'percentageOfTimeFrame' && (
        <>
          <PercentageOfTimeFrame
            handleOptionChange={handleOptionChange}
            row={row}
          />
          <DaysOfTimeFrame handleOptionChange={handleOptionChange} row={row} />
        </>
      )}

      {row.param === 'profit' && row.type === 'number' && (
        <DolorValue handleOptionChange={handleOptionChange} row={row} />
      )}
      {row.param === 'profit' && row.type === 'timeframe' && (
        <DaysValue handleOptionChange={handleOptionChange} row={row} />
      )}
    </>
  );
};

export default Value;
