import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//-----< Component Imports -----\\
import LayerColumn from './LayerColumn';

//-----< Stylings >-----\\
const Container = styled.div`
  z-index: 10;
  background-color: var(--color-bkg-light);
  grid-area: layers;
  overflow-y: scroll;
  height: 100vh;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-bkg-main);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: var(--color-primary-dark);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
`;
const AddIcon = styled.button`
  transition: all .25s;
  transition-timing-function: cubic-bezier(0, 0.96, .48, 2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  path {
    transition: fill .2s;
    fill: white;
  }
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
  
`;

const initialData = {
  tasks: {
    'l0': {id: 'l0', content: 'Tie my shoe'},
    'l1': {id: 'l1', content: 'Shut the door'},
    'l2': {id: 'l2', content: 'Pick up sticks'},
  },
  columnData: {
    id: 'layerColumn',
    title: 'Layers',
  }
}


export default function EditWindowLayers() {

  const dispatch = useDispatch();

  const layerData = useSelector(state=>state.edit.layerData);

  const [columnData, setColumnData] = useState(initialData.columnData);

  function renderDndColumns() {
    console.log('Rendering DND columns');
    
    return <LayerColumn key={columnData.id} column={columnData} layerData={layerData}/>
  }

  function addLayer() {
    console.log('ADD NEW LAYER');
    
    dispatch({type: 'ADD_NEW_LAYER'})
  }

  function onDragEnd(result) {
    const {destination, source} = result;

    //If not dropped in a viable place, exit function and do nothing
    if (!destination) { return; }

    //If dropped in the same place it was before, exit function and do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; }

    //Reorder array
    let newLayerData = [...layerData];

    //Remove item from original place and splice into new home
    newLayerData.splice(source.index,1);
    newLayerData.splice(destination.index, 0, layerData[source.index]);

    //Recreate the target column, but with new taskIds
    console.log('New layer data:',newLayerData);
    
    dispatch({type: 'SET_LAYER_DATA', payload: newLayerData});
    dispatch({type: 'SET_LAYER_SELECT', payload: destination.index})

    //Generate a new state for our app and set it
    //console.log(newColumn);
    const newColumn = {
      ...columnData,
    };
    setColumnData(newColumn)
  }

  return (
    <Container>
      
      <DragDropContext onDragEnd={onDragEnd}>
        {renderDndColumns()}
      </DragDropContext>
      <AddIcon className="button-confirm" onClick={addLayer}>
        <FontAwesomeIcon icon={faPlus}  />
      </AddIcon>
    </Container>
  )
}