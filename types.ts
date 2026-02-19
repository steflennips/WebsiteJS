
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface MaturityResult {
  level: number;
  label: string;
  description: string;
  scores: {
    kpi: number;      // 1-10
    infra: number;    // 1-10
    culture: number;  // 1-10
  };
  quickWins: string[];
  longTermStrategy: string;
  recommendations: string[];
}

export enum MaturityLevels {
  ADHOC = 1,
  REACTIVE = 2,
  PROACTIVE = 3,
  STRATEGIC = 4,
  INNOVATIVE = 5
}
