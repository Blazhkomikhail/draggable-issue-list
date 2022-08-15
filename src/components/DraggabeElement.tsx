import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { IssueModel } from "../models/issueModel";
import countDaysDiff from "../helpers/coundDaysDiff";

export interface props {
  index: number;
  issueItem: IssueModel;
}

const DraggabeElement: React.FC<props> = ({
  index,
  issueItem,
}): JSX.Element => {
  const daysDiff = countDaysDiff(issueItem.created_at);
  const cardText = `#${issueItem.number} opened ${daysDiff} days ago by ${issueItem.login}`;

  return (
    <Draggable draggableId={`draggable-${issueItem.id}`} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="py-2"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card className="py-4 px-3">
              <h6 className="text-capitalize">{issueItem.title}</h6>
              <p style={{ fontSize: "0.85rem" }} className="m-0 text-secondary">
                {cardText}
              </p>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggabeElement;
