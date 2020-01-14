import React from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

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

  const frameList = useSelector(state=>state.frame);

  function renderCards() {
    return frameList.map( (frame,i)=> {
      return <GalleryCard key={i} frame={frame} />
    })
  }
  
  return (
    <Container>
      {renderCards()}
    </Container>
  )
}