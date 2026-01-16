
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface MaturityResult {
  level: number;
  label: string;
  description: string;
  recommendations: string[];
}

export enum MaturityLevels {
  ADHOC = 1,
  REACTIVE = 2,
  PROACTIVE = 3,
  STRATEGIC = 4,
  INNOVATIVE = 5
}
