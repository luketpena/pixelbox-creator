import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTimes } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  position: relative;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  box-shadow: ${props=> (props.isDragging ? '0 2px 4px -2px var(--color-shadow-faded)' : '0 2px 4px 0 var(--color-shadow-main)' )};
  display: flex;
  align-content: center;
  background-color: ${props=> (props.isDragging ? 'var(--color-primary)' : (props.select===props.index? 'var(--color-primary)' : 'var(--color-bkg-bright)') )};
  color: ${props=> (props.isDragging ? 'white' : (props.select===props.index? 'var(--color-shadow-main)' : 'var(--color-text-darkest)') )};
  
  display: grid;
  grid-template-areas: "grab name delete";
  grid-template-columns: auto 1fr auto;
  user-select: none;
`;

const Title = styled.p`
  font-family: var(--font-button);
`;

const DeleteArea = styled.div`
  grid-area: delete;
  padding: 0 8px;
  &:hover {
    cursor: pointer;
    color: ${props=> (props.select===props.index? 'white' : 'var(--color-text-light)')};
    background-color: rgba(255,255,255,.05);
  }
`;

const SelectArea = styled.div`
  text-align: left;
  grid-area: name;
  padding: 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(0,0,0,.05);
  box-shadow: inset -32px 0 32px -32px rgba(0,0,0,.2);
  &:hover {
    cursor: pointer;
    color: ${props=> (props.select===props.index? 'white' : 'var(--color-text-light)')};
    background-color: rgba(255,255,255,.1);
  }

`;

const GrabArea = styled.div`
  grid-area: grab;
  padding: 0 4px;
  &:hover {
    color: ${props=> (props.select===props.index? 'white' : 'var(--color-text-light)')};
    background-color: rgba(255,255,255,.05);
  }
`;

export default function Task(props) {

  const dispatch = useDispatch();

  const select = useSelector(state=>state.edit.select);

  function selectLayer() {
    if (select!==props.index) {
      dispatch({type: 'SET_LAYER_SELECT', payload: props.index})
    } else {
      dispatch({type: 'SET_LAYER_SELECT', payload: -1})
    }
  }

  function removeLayer() {
    dispatch({type: 'REMOVE_LAYER', payload: props.index});
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
          select={select}
          index={props.index}
        >
          <GrabArea {...provided.dragHandleProps}>
            <p><FontAwesomeIcon icon={faGripVertical}/></p>
          </GrabArea>
          
          <SelectArea onClick={selectLayer}>
            <Title isDragging={snapshot.isDragging}>{props.layer.layer_name}</Title>
          </SelectArea>

          <DeleteArea onClick={removeLayer}>
            <p><FontAwesomeIcon icon={faTimes} /></p>
          </DeleteArea>
        </Container>
      )}
    </Draggable>
  )

}