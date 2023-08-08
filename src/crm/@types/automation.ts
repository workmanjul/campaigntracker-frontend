import { Row } from './Row';

export interface Automation {
  id: string;

  name: string;

  automationInMinutes: string;

  options: string;

  budgetAmount: string | null;

  budgetType: string;

  budgetPercent: string | null;
  rules: Row[];
  status: string;
  actionStatus: string;
  nextRun: string;
  displayText: string;
  postToDatabase: boolean;
  lastRun: null | string;
}
