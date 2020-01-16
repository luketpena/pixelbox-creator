import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';


//-----< Component Imports -----\\
import LayerWidget from './LayerWidget';
import LayerColumn from './LayerColumn';

const initialData = {
  tasks: {
    'l0': {id: 'l0', content: 'Tie my shoe'},
    'l1': {id: 'l1', content: 'Shut the door'},
    'l2': {id: 'l2', content: 'Pick up sticks'},
  },
  columnData: {
    id: 'layerColumn',
    title: 'Layers',
    taskIds: ['l0','l1','l2'],
  }
}


export default function EditWindowLayers() {

  const dispatch = useDispatch();

  const layerData = (state=>state.edit.layerData);

  const [columnData, setColumnData] = useState(initialData.columnData);
  const [taskList, setTasks] = useState(initialData.tasks);

  function renderDndColumns() {
    const column = columnData;
    const tasks = column.taskIds.map(taskId => taskList[taskId]);
    
    return <LayerColumn key={column.id} column={column} tasks={tasks}/>
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
    const column = columnData;
    const newTaskIds = Array.from(column.taskIds);

    //Remove item from original place and splice into new home
    newTaskIds.splice(source.index,1);
    newTaskIds.splice(destination.index, 0, draggableId);

    //Recreate the target column, but with new taskIds
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    //Generate a new state for our app and set it
    setColumnData(newColumn)
  }

  return (
    <div id="edit-window-layers">
      {/* {this.renderLayerWidgets()}
      <div>
        <button onClick={this.addLayer}>Add Layer</button>
      </div> */}
      <DragDropContext onDragEnd={onDragEnd}>
        {renderDndColumns()}
      </DragDropContext>
    </div>
  )
}