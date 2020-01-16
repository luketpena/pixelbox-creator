import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import styled from 'styled-components';


//-----< Component Imports -----\\
import LayerWidget from './LayerWidget';
import LayerColumn from './LayerColumn';

//-----< Stylings >-----\\
const Container = styled.div`
  z-index: 10;
  background-color: white;
  grid-area: layers;
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
    taskIds: [0,1,2,3,4],
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

  function renderLayerWidgets() {    
    return layerData.map( (layer,i)=> {
      return <LayerWidget key={i} index={i}/>
    })
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

    //Generate a new state for our app and set it
    //console.log(newColumn);
    const newColumn = {
      ...columnData,
      taskIds: [0,1,2,3,4]
    };
    setColumnData(newColumn)
  }

  return (
    <Container>
      {/* {this.renderLayerWidgets()}
      <div>
        <button onClick={this.addLayer}>Add Layer</button>
      </div> */}
      <DragDropContext onDragEnd={onDragEnd}>
        {renderDndColumns()}
      </DragDropContext>
    </Container>
  )
}