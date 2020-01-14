import React from 'react';
import styled from 'styled-components';

//-----< Styling >-----\\
const Container = styled.div`
  grid-area: header;
  background-color: yellow;
`;

const CreateButton = styled.button`
`;

export default function MainHeader() {

  return(
    <Container>
      <h2>Header</h2>
      <CreateButton>Create New Frame</CreateButton>
    </Container>
  );
}