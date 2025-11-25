export interface QuestionType {
  question: string;
  option1: string;
  option2: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  FORM_QUESTION = 'FORM_QUESTION',
  FUNNY_QUESTION = 'FUNNY_QUESTION',
}
