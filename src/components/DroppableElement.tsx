import * as React from "react";
import { useContext } from "react";
import { IssuesContext } from "../context/IssuesContext";
import { IssueContextType } from "../models/issueModel";
import { Droppable } from "react-beautiful-dnd";
import { Col } from "react-bootstrap";
import DraggabeElement from "./DraggabeElement";

export interface IProps {
  title: string;
}

const DroppableElement: React.FC<IProps> = ({ title }): JSX.Element => {
  const { issues } = useContext(IssuesContext) as IssueContextType;
  return (
    <Col>
      <h4 className="text-capitalize">{title}</h4>
      <Droppable droppableId={`${title}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {issues &&
              issues[title].map((item, index) => (
                <DraggabeElement key={item.id} issueItem={item} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default DroppableElement;
