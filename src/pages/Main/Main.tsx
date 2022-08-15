import * as React from "react";
import { useRef, useState } from "react";
import { Button, Container, Stack, Form } from "react-bootstrap";
import { IssueContextType } from "../../models/issueModel";
import { IssuesContext } from "../../context/IssuesContext";
import getIssuesAPI from "../../api/getIssuesAPI";
import getOwnerRepoDataFromURL from "../../helpers/getOwnerRepoDataFromURL";
import DragDropContainer from "../../components/DragDropContainer";
import setIssuesToContext from "./helpers/setIssuesToContext";

const Main: React.FC = (): JSX.Element => {
  const { setIssues } = React.useContext(IssuesContext) as IssueContextType;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string[] | null>(null);

  const onSearchButtonClick = () => {
    const { current } = inputRef;

    if (current && current.value) {
      getIssuesAPI(current.value).then((response) => {
        setIssuesToContext(response, setIssues);
      });

      setTitle(getOwnerRepoDataFromURL(current.value));
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

      <h4 style={{ color: "#2f80ed", height: "30px" }}>
        {title && `${title[0]}`}
        {title && <span style={{ color: "#000", fontWeight: 400 }}> / </span>}
        {title && `${title[1]}`}
      </h4>
      <DragDropContainer />
    </Container>
  );
};

export default Main;
