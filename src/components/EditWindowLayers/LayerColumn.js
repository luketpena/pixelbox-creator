import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import LayerTab from './LayerTab';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px
`;

const TaskList = styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided)=> (
            <TaskList
              ref={provided.innerRef}
              //Applies the properties that a droppable area needs
              {...provided.droppableProps}
            >
              {this.props.tasks.map( (task,i)=> <LayerTab key={task.id} task={task} index={i}/>)}
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