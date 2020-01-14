import React from 'react';
import styled from 'styled-components';

//-----< Component Imports >-----\\
import GalleryCard from './GalleryCard';

//-----< Styling >-----\\
const Container = styled.div`
  background-color: steelblue;
  grid-area: gallery;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;  
`;
export default function MainGallery() {
  
  return (
    <Container>
      <GalleryCard /> 
      <GalleryCard />
      <GalleryCard />
      <GalleryCard />
      <GalleryCard />
    </Container>
  )
}