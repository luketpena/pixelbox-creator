import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import MainHeader from './MainHeader';
import MainGallery from './MainGallery';

//-----< Styling >-----\\
const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-areas:
    "header"
    "gallery";
  grid-template-rows: 128px 1fr;
  background-color: #333;
`;

export default function ManageMain() {

  return (
    <Main>
      <MainHeader />
      <MainGallery />
    </Main>
  )
}