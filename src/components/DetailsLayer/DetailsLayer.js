import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import DetailsLayerMain from './DetailsLayerMain';
import DetailsLayerFilter from './DetailsLayerFilter';

//-----< Styling >-----\\
const Container = styled.div`
  display: grid;
  grid-template-areas: "main filters";
  grid-template-columns: 1fr 1fr
`;


export default function DetailsLayer() {
  return (
    <Container className="details-widget">
      
      <DetailsLayerMain />
      <DetailsLayerFilter />
      
    </Container>
  )
}