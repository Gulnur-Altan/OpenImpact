export type CauseCategory = 
  | 'Technology-driven giving' 
  | 'Youth leadership' 
  | 'Equity & inclusion' 
  | 'Ethical & accountable giving' 
  | 'Climate & poverty';

export interface MicroImpactUnit {
  costPerUnit: number; // e.g. 15 for $15
  hoursPerUnit?: number; // e.g. 2 for 2 hours
  unitName: string; // e.g. "Solar Study Lamp"
  unitDescription: string;
  badge: string;
}

export interface BudgetSlice {
  category: string;
  percentage: number;
  amount: number;
  description: string;
}

export interface ImpactUpdate {
  id: string;
  date: string;
  title: string;
  summary: string;
  verifiedReceiptCount: number;
  beneficiariesReached: number;
  author: string;
  authorRole: string;
  tag: string;
}

export interface CauseProject {
  id: string;
  title: string;
  tagline: string;
  organization: string;
  leadOrganizer: string;
  location: string;
  category: CauseCategory;
  verifiedNonprofit: boolean;
  transparencyScore: number; // 0 - 100
  targetAmount: number;
  currentAmount: number;
  targetHours: number;
  currentHours: number;
  impactUnits: MicroImpactUnit[];
  budgetBreakdown: BudgetSlice[];
  updates: ImpactUpdate[];
  description: string;
  unSdgGoals: number[]; // e.g. [1, 4, 7, 13]
  urgencyLevel: 'normal' | 'urgent' | 'critical';
}

export interface Pledge {
  id: string;
  projectId: string;
  projectTitle: string;
  pledgerName: string;
  pledgerAvatar?: string;
  type: 'funds' | 'hours' | 'supplies';
  amount: number;
  impactAchieved: string;
  message?: string;
  timestamp: string;
  parentId?: string; // id of pledge that inspired this
  rippleCount: number; // number of people this pledge inspired
  badge?: string;
}

export interface GeneratedDispatch {
  headline: string;
  overview: string;
  keyOutcomes: string[];
  fieldQuote: {
    quote: string;
    speaker: string;
    context: string;
  };
  transparentAccounting: {
    item: string;
    cost: string;
    proofStatus: string;
  }[];
  nextMilestone: string;
  markdownForDevTo: string;
  socialShareSnippet: string;
}
