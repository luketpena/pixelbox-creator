import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { SvgIcon } from '@material-ui/core';

const Container = styled.div`
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  box-shadow: 0 2px 4px 2px var(--color-shadow-main);
  display: flex;
  align-content: center;
`;

export default function Task(props) {

  function DragIcon(props) {
    return (
      <SvgIcon {...props}>
        <path className='layer-drag-path' d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </SvgIcon>
    );
  }

  return (
    <Draggable draggableId={String(props.index)} index={props.index}>
      {(provided)=> (
        <Container
          // Applies the props required by a draggable element
          {...provided.draggableProps}
          // Applies the props for the handle of a draggable element
          // This can also be applied to a child of the element if the handle
          // is smaller than the entire body of the element.
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragIcon  />
          {props.layer.layer_name}
          {props.index}
        </Container>
      )}
    </Draggable>
  )

}