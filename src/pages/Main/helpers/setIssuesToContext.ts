import listsNameEnum from "../../../helpers/enums/listsNameEnum";
import {
  IIssueContextModel,
  ResponseModel
} from "../../../models/issueModel";

enum IssueStateEnum {
  open = "open",
  closed = "closed",
}

const setIssuesToContext = (responseData: ResponseModel[], setState: (issues: IIssueContextModel | null) => void) => {
  const contextData = {
    [listsNameEnum.backlog]: [],
    [listsNameEnum.completed]: [],
    [listsNameEnum.inprogress]: [],
  } as IIssueContextModel;

  responseData.forEach(
    ({
      title,
      created_at,
      id,
      number,
      state,
      state_reason,
      user: { login },
    }) => {
      const itemData = {
        title,
        created_at,
        login,
        id,
        number,
      };
      if (state === IssueStateEnum.open) {
        contextData[listsNameEnum.inprogress].push(itemData);
      } else if (
        state === IssueStateEnum.closed &&
        state_reason === "completed"
      ) {
        contextData[listsNameEnum.completed].push(itemData);
      } else {
        contextData[listsNameEnum.backlog].push(itemData);
      }
    }
  );
  setState(contextData);
};

export default setIssuesToContext;