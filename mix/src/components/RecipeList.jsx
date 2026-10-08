import React from "react";
import {
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";   // or react-beautiful-dnd

import RecipeItem from "./RecipeItem";

function RecipeList({ list }) {
  return (
    <div className="recipe-list">
      <h2>{list.title}</h2>

      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver
                ? "drop-zone drag-over"
                : "drop-zone"
            }
          >
            {list.items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <RecipeItem
                      recipe={item}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default RecipeList;