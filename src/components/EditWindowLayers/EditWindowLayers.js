import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';
import { SvgIcon } from '@material-ui/core';


//-----< Component Imports -----\\
import LayerColumn from './LayerColumn';

//-----< Stylings >-----\\
const Container = styled.div`
  z-index: 10;
  background-color: var(--color-bkg-light);
  grid-area: layers;
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
  const [taskList, setTasks] = useState(layerData);

  function renderDndColumns() {
    console.log('Rendering DND columns');
    
    return <LayerColumn key={columnData.id} column={columnData} layerData={layerData}/>
  }

  function addLayer() {
    dispatch({type: 'ADD_NEW_LAYER'})
  }

  function onDragEnd(result) {
    const {destination, source, draggableId} = result;

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

  function addLayer() {
    dispatch({type: 'ADD_NEW_LAYER'});
  }

  return (
    <Container>
      
      <DragDropContext onDragEnd={onDragEnd}>
        {renderDndColumns()}
      </DragDropContext>
      <AddIcon className="button-confirm">

        <SvgIcon onClick={addLayer}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </SvgIcon>
      </AddIcon>
    </Container>
  )
}