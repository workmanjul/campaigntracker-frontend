import React, { useEffect, useState } from 'react';
import { Row } from '@src/crm/@types/Row';
import { restApi } from '@api';
import Params from '@src/crm/components/automation/Params';
import DaysAgo from '@src/crm/components/automation/DaysAgo';
import Operators from '@src/crm/components/automation/Operators';
import Types from '@src/crm/components/automation/Types';
import Value from '@src/crm/components/automation/Value';
import { Automation } from '@src/crm/@types/automation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAutomations: any;
  automation?: Automation;
}

const AutomationNewDialog: React.FC<Props> = ({
  dialogOpen,
  setDialogOpen,
  automation,
  fetchAutomations,
}) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [automationInMinutes, setAutomationInMinutes] = useState<string>('');
  const [options, setOptions] = useState<string>('');
  const [budgetPercent, setBudgetPercent] = useState<string>('');
  const [actionStatus, setStatus] = useState<string>('');
  const [useAmountChecked, setUseAmountChecked] = useState(false);
  const [isActiveChecked, setActiveChecked] = useState(false);
  const [isPostToDatabaseChecked, setPostToDatabaseChecked] = useState(false);

  useEffect(() => {
    if (automation !== undefined) {
      setRows(automation.rules);
      setName(automation.name);
      setAutomationInMinutes(automation.automationInMinutes);
      setOptions(automation.options);
      if (automation.budgetType == 'percentage') {
        setBudgetPercent(automation.budgetPercent || '');
      } else {
        setBudgetPercent(automation.budgetAmount || '');
        setUseAmountChecked(true);
      }
      setStatus(automation.actionStatus || '');
      setPostToDatabaseChecked(automation.postToDatabase);
      setActiveChecked(automation.status === 'active' ? true : false);
    }
  }, [automation]);

  const [rows, setRows] = useState<Row[]>([]);
  const isUpdate = automation !== undefined;
  const addRow = () => {
    const newRow: Row = {
      id: rows.length + 1,
      param: '',
      days: '',
      operand: '',
      type: '',
      daysAgo: '',
      dollarValue: '',
      daysCompareTo: '',
      percentValue: '',
      displayText: '',
      valuesAdclicks: '',
      budgetAdjustment: '',
      averageRPC: '',
      categoryRPC: '',
      parameters: '',
      percentageOfTimeFrame: '',
      daysOfTimeFrame: '',
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleOptionChange = (id: number, value: string, type: string) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [type]: value };
      }

      return row;
    });
    console.log('row', updatedRows);
    setRows(updatedRows);
  };

  const handleTypeChange = (id: number, value: string) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        row.type = value;

        if (row.param === 'margin' && row.type === 'timeframe') {
          row.percentValue = '';
        }
        if (row.param === 'margin' && row.type === 'number') {
          row.percentValue = '';
        }

        if (row.param === 'profit' && row.type === 'timeframe') {
          row.dollarValue = '';
          row.daysCompareTo = '';
        }
        if (row.param === 'margin' && row.type === 'percentageOfTimeFrame') {
          row.percentValue = '';
        }
        if (row.param === 'margin' && row.type === 'percentageOfTimeFrame') {
        }
        if (row.param == 'profit' && row.type === 'number') {
          row.percentValue = '';
        }
        if (row.param === 'profit' && row.type == 'percentageOfTimeFrame') {
          row.percentValue = '';
        }
        return row;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    let innerBudgetPercent: number | null = 0;
    let innerBudgetAmount: number | null = 0;
    if (useAmountChecked) {
      innerBudgetAmount = Number(budgetPercent);
      innerBudgetPercent = null;
    } else {
      innerBudgetPercent = Number(budgetPercent);
      innerBudgetAmount = null;
    }

    const formData = {
      data: rows,
      options: options,
      budgetType: useAmountChecked ? 'amount' : 'percentage',
      status: isActiveChecked ? 'active' : 'inactive',
      actionStatus: actionStatus,
      name: name,
      automationInMinutes: automationInMinutes,
      budgetPercent: innerBudgetPercent?.toString(),
      budgetAmount: innerBudgetAmount?.toString(),
      postToDatabase: isPostToDatabaseChecked,
    };

    if (isUpdate) {
      await restApi.put(`/automation/${automation.id}`, formData);
      toast.success('Automation updated successfully');
    } else {
      await restApi.post('/automation', formData);
      toast.success('Automation created successfully');
    }
    setDialogOpen(false);
    fetchAutomations();
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={dialogOpen}
        style={{ display: 'none' }}
        onChange={() => {}}
        readOnly={true}
        className="hidden modal-toggle"
      />
      <div className="modal">
        <div className="modal-box modal-box w-11/12 max-w-4xl">
          <div className="flex flex-col">
            <div className={'mb-2'}>
              {isUpdate ? 'Update' : 'Add New'} Automation
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <input
                  type="text"
                  placeholder="Name*"
                  className="input input-bordered w-full "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={'mt-2'}>
                <input
                  id={'is_active'}
                  type="checkbox"
                  checked={isActiveChecked}
                  onChange={(e) => {
                    setActiveChecked((v) => !v);
                  }}
                  className="checkbox checkbox-primary checkbox-sm mr-1"
                />
                <label htmlFor={'is_active'}> Active </label>

                <input
                  id={'post_to_database'}
                  type="checkbox"
                  checked={isPostToDatabaseChecked}
                  onChange={(e) => {
                    setPostToDatabaseChecked((v) => !v);
                  }}
                  className="checkbox checkbox-primary checkbox-sm mr-1"
                />
                <label htmlFor={'post_to_database'}> Post to Database </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Run Automation (In Minutes)*"
                  className="input input-bordered w-full"
                  value={automationInMinutes}
                  onChange={(e) => setAutomationInMinutes(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="select select-bordered w-full "
                  id=""
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value="Budget Increase">Budget Increase</option>
                  <option value="Budget Decrease">Budget Decrease</option>
                  <option value="Status">Status</option>
                </select>
              </div>
              <div>
                {(options === 'Budget Increase' ||
                  options === 'Budget Decrease') && (
                  <>
                    <input
                      type="number"
                      placeholder={useAmountChecked ? 'Amount' : 'Percentage'}
                      className="input input-bordered w-full "
                      value={budgetPercent}
                      onChange={(e) => setBudgetPercent(e.target.value)}
                    />
                    <div className={'mt-2'}>
                      <input
                        id={'use_amount'}
                        type="checkbox"
                        checked={useAmountChecked}
                        onChange={(e) => {
                          setUseAmountChecked((v) => !v);
                        }}
                        className="checkbox checkbox-primary checkbox-sm mr-1"
                      />
                      <label htmlFor={'use_amount'}> Use Amount</label>
                    </div>
                  </>
                )}
                {options === 'Status' && (
                  <div className="flex-1 mr-2">
                    <select
                      className="select select-bordered w-full"
                      id=""
                      value={actionStatus}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Start">Start</option>
                      <option value="Pause">Pause</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4 mb-2">
            <div>Filter</div>
            <div>
              <button className="btn btn-primary btn-sm" onClick={addRow}>
                +
              </button>
            </div>
          </div>
          {rows.map((row) => (
            <div className="flex gap-4 mb-4" key={row.id.toString()}>
              <Params handleOptionChange={handleOptionChange} row={row} />
              {(row.param === 'margin' ||
                row.param === 'profit' ||
                row.param === 'rpc') && (
                <DaysAgo handleOptionChange={handleOptionChange} row={row} />
              )}
              <Operators handleOptionChange={handleOptionChange} row={row} />

              {row.param !== 'current_budget' &&
                row.param !== 'adset_age' &&
                row.param !== 'ad_clicks' &&
                row.param !== 'budget_adjustment' && (
                  <Types handleTypeChange={handleTypeChange} row={row} />
                )}
              <Value handleOptionChange={handleOptionChange} row={row} />
              <div className="self-center">
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => removeRow(row.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <div>
              <button
                className="btn btn-error mr-2"
                type={'button'}
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type={'button'}
                onClick={handleSubmit}
              >
                {isUpdate ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationNewDialog;
