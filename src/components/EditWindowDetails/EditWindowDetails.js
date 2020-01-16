import React, {Component} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports -----\\
import DetailsFrame from '../DetailsFrame/DetailsFrame';
import DetailsLayer from '../DetailsLayer/DetailsLayer';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: details;
  background-color: ${props=>(props.select===-1? 'var(--color-shadow-main)' : 'var(--color-primary)')};
  padding: 4px;
`;

//-----< Component Function >-----\\
export default function EditWindowDetails() {

  const frame = useSelector(state=>state.edit);

  function renderDetails() {
    if (frame.select===-1) {
      return <DetailsFrame />
    } else {
      return <DetailsLayer key={frame.select}/>
    }
  }

  return (
    <Container select={frame.select}>
      {renderDetails()}
    </Container>
  )
}