import React, { createContext, useState } from "react";
import { IssueContextType, IIssueContextModel } from "../models/issueModel";

export const IssuesContext = createContext<IssueContextType | null>(null);

const IssuesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<IIssueContextModel | null>(null);

  const value = { issues, setIssues };

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
};

export default IssuesContextProvider;
