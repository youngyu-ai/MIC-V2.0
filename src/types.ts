export type TriageCategory = 'red' | 'yellow' | 'green' | 'black';

export interface TriageCard {
  id: string;
  serialNumber: number;
  category: TriageCategory;
  demographics: string; // e.g. "6歲，男性", "50歲，女性"
  age: number;
  gender: '男性' | '女性';
  bullets: string[]; // Formatted bullet lines as shown in reference image
  primaryInjury?: string;
  explanation: string; // Clinical triage rationale (e.g. 呼吸>30次/分, CRT>2秒)
  isCustom?: boolean;
}

export interface TriageCounts {
  red: number;
  yellow: number;
  green: number;
  black: number;
}

export interface PrintSettings {
  showAnswerTag: boolean; // Show Red/Yellow/Green/Black badge on cards
  answerTagPosition: 'badge' | 'corner' | 'bottom-bar' | 'hidden';
  showCutLines: boolean; // Dashed cut guidelines for cutting 6 cards
  showCardNumber: boolean; // #01, #02...
  includeAnswerSheet: boolean; // Include Instructor Answer Key page at the end
  cardStyle: 'authentic' | 'bordered'; // 'authentic' matches image reference (#f6f3e9)
  fontSizeDelta: number; // Font size adjustment (default: 3)
  textAlign: 'center' | 'left'; // Text alignment (default: 'center')
}
