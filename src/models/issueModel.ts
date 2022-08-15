export interface ResponseModel {
  title: string;
  created_at: Date;
  user: {
    login:  string; 
  }
  id: number;
  number: number;
  state: string;
  state_reason: string | null;
}

export interface IssueModel {
  title: string;
  created_at: Date;
  login: string; // user.login
  id: number;
  number: number;
};

export interface IIssueContextModel {
  [key: string]: IssueModel[];
}

export type IssueContextType = {
  issues: IIssueContextModel | null;
  setIssues: (issues: IIssueContextModel | null) => void;
};