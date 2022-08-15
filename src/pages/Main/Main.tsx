import * as React from "react";
import { useRef, useState } from "react";
import { Button, Container, Stack, Form, Breadcrumb } from "react-bootstrap";
import { IssueContextType } from "../../models/issueModel";
import { IssuesContext } from "../../context/IssuesContext";
import getIssuesAPI from "../../api/getIssuesAPI";
import getOwnerRepoDataFromURL from "../../helpers/getOwnerRepoDataFromURL";
import DragDropContainer from "../../components/DragDropContainer";
import setIssuesToContext from "./helpers/setIssuesToContext";
import createRepoURL from "./helpers/createRepoURL";

const Main: React.FC = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setIssues } = React.useContext(IssuesContext) as IssueContextType;
  const [breadCrumbs, setBreadCrumbs] = useState<string[] | null>(null);
  const [requestURL, setRequestURL] = useState<string>("");

  const onSearchButtonClick = () => {
    const { current } = inputRef;

    if (current && current.value) {
      getIssuesAPI(current.value).then((response) => {
        setIssuesToContext(response, setIssues);
      });

      setRequestURL(current.value);
      setBreadCrumbs(getOwnerRepoDataFromURL(current.value));
    }
  };

  return (
    <Container className="pt-3">
      <Stack className="mb-3" direction="horizontal" gap={3}>
        <Form.Control
          ref={inputRef}
          className="me-auto"
          placeholder="Repo Url"
        />
        <Button
          type="button"
          className="btn btn-primary"
          style={{ flexShrink: 0 }}
          onClick={onSearchButtonClick}
        >
          {" "}
          Load Issues{" "}
        </Button>
      </Stack>

      <Breadcrumb>
        {breadCrumbs &&
          <>
            <Breadcrumb.Item href={createRepoURL(requestURL)} target="_blank">{breadCrumbs[0]}</Breadcrumb.Item>
            <Breadcrumb.Item href={requestURL} target="_blank">{breadCrumbs[1]}</Breadcrumb.Item>
          </>
        }
      </Breadcrumb>
      <DragDropContainer />
    </Container>
  );
};

export default Main;
