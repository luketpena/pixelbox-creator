import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import LayerTab from './LayerTab';

const Container = styled.div`

`;

const TaskList = styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {

  componentDidMount() {
    console.log('Column mount!');
    
  }

  render() {
    console.log(this.props.layerData);
    
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
          {(provided)=> (
            <TaskList
              ref={provided.innerRef}
              //Applies the properties that a droppable area needs
              {...provided.droppableProps}
            >
              {this.props.layerData.map( (layer,i)=> <LayerTab key={i} layer={layer} index={i}/>)}
              {/* 
                The placeholder is a child of a droppable element. It takes
                up space on the list while an item is being reordered.
              */}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}