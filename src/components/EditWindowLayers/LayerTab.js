import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import { SvgIcon } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';

const Container = styled.div`
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: ${props=> (props.isDragging ? '0 2px 4px -2px var(--color-shadow-faded)' : '0 2px 4px 2px var(--color-shadow-main)' )};
  display: flex;
  align-content: center;
  background-color: ${props=> (props.isDragging ? 'var(--color-primary)' : (props.select===props.index? 'var(--color-primary)' : 'white') )};
  color: ${props=> (props.isDragging ? 'white' : (props.select===props.index? 'var(--color-shadow-main)' : 'var(--color-text-dark)') )};
  &:hover {
    cursor: pointer;
    color: ${props=> (props.select===props.index? 'white' : 'var(--color-text-light)')};
  }
`;

const Title = styled.p`
  font-family: var(--font-button);
  margin: 0;
  line-height: 24px;
`;

export default function Task(props) {

  const dispatch = useDispatch();

  function DragIcon(props) {
    return (
      <SvgIcon {...props}>
        <path className='layer-drag-path' d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </SvgIcon>
    );
  }

  const select = useSelector(state=>state.edit.select);

  function selectLayer() {
    console.log('SelectedLayer!',props.index);
    dispatch({type: 'SET_LAYER_SELECT', payload: props.index})
  }

  return (
    <Draggable draggableId={String(props.index)} index={props.index}>
      {(provided, snapshot)=> (
        <Container
          // Applies the props required by a draggable element
          {...provided.draggableProps}
          // Applies the props for the handle of a draggable element
          // This can also be applied to a child of the element if the handle
          // is smaller than the entire body of the element.
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={selectLayer}
          select={select}
          index={props.index}
        >
          <div {...provided.dragHandleProps}><DragIcon/></div>
          <Title isDragging={snapshot.isDragging} >{props.layer.layer_name}</Title>
        </Container>
      )}
    </Draggable>
  )

}