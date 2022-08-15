import * as React from "react";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";
import { IssuesContext } from "../context/IssuesContext";
import { IssueContextType, IssueModel } from "../models/issueModel";
import DroppableElement from "./DroppableElement";

const DragDropContainer: React.FC = (): JSX.Element => {
  const { issues, setIssues } = useContext(IssuesContext) as IssueContextType;
  const lists = ["backlog", "inprogress", "completed"];

  const removeFromList = (
    list: IssueModel[],
    index: number
  ): [removed: IssueModel, result: IssueModel[]] => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (
    list: IssueModel[],
    index: number,
    element: IssueModel
  ): IssueModel[] => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result: any) => {
    console.dir(result);
    if (!result.destination) return;
    const listCopy = { ...issues };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setIssues(listCopy);
  };
  console.log(issues);

  return (
    <Container className="bg-light py-4 px-3">
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          {issues &&
            lists.map((listKey, idx) => (
              <DroppableElement key={`${listKey}_${idx}`} title={listKey} />
            ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default DragDropContainer;
