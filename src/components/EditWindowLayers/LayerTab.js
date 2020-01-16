import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  box-shadow: 0 2px 4px 2px var(--color-shadow-main);
`;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided)=> (
          <Container
            // Applies the props required by a draggable element
            {...provided.draggableProps}
            // Applies the props for the handle of a draggable element
            // This can also be applied to a child of the element if the handle
            // is smaller than the entire body of the element.
            {...provided.dragHandleProps} 
            ref={provided.innerRef}
          >{this.props.task.content}</Container>
        )}
      </Draggable>
    )
  }
}