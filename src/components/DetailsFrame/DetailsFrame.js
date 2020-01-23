import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import DetailsFrameSize from './DetailsFrameSize';
import DetailsFrameMain from './DetailsFrameMain';

//-----< Styling >-----\\
const Container = styled.div`
  display: grid;
  grid-template-areas: "size main";
  grid-template-columns: auto 1fr;
  align-items: flex-start;  
`;

//-----< Component Function >-----\\
export default function DetailsFrame() {
  //>> Render
  return (
    <Container className="details-widget">
      <DetailsFrameSize />
      <DetailsFrameMain />
    </Container>
  );
}