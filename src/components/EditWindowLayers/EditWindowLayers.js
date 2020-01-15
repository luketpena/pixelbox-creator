import React, {Component} from 'react';
import {connect} from 'react-redux';
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


class EditWindowLayers extends Component {

  state = initialData;

  renderDndColumns = ()=> {
    const column = this.state.columnData;
    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
    
    return <LayerColumn key={column.id} column={column} tasks={tasks}/>
  }

  renderLayerWidgets = ()=> {    
    return this.props.layers.map( (layer,i)=> {
      return <LayerWidget key={i} index={i}/>
    })
  }

  addLayer = ()=> {
    this.props.dispatch({type: 'ADD_NEW_LAYER'})
  }

  onDragEnd = (result)=> {
    const {destination, source, draggableId} = result;

    //If not dropped in a viable place, exit function and do nothing
    if (!destination) { return; }

    //If dropped in the same place it was before, exit function and do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) { return; }

    //Reorder array
    const column = this.state.columnData;
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
    const newState = {
      ...this.state,
      columnData: newColumn
    };
    this.setState(newState);
  }

  render() {

    return (
      <div id="edit-window-layers">
        {/* {this.renderLayerWidgets()}
        <div>
          <button onClick={this.addLayer}>Add Layer</button>
        </div> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.renderDndColumns()}
        </DragDropContext>
      </div>
    )
  }
}

export default connect(state=>({layers: state.edit.layerData}))(EditWindowLayers);