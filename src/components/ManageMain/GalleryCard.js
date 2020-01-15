import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const testImage = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/116770670/original/281f85ad141b056fc82fa8058134a86421c61817/paint-you-a-beautiful-pixel-art-landscape.png';

const Card = styled.div`
  background-color: white;
  width: 256px;
  margin: 8px;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 4px 16px -8px black;
`;
const CardButton = styled.button`

`;

const CardImg = styled.img`
  width: 100%;
  height 128px;
  object-fit: cover;
`;

const Title = styled.h3`
  margin: 0;
`;

export default function GalleryCard(props) {

  const dispatch = useDispatch();

  function deleteFrame() {
    dispatch({type: 'DELETE_FRAME', payload: props.frame.id})
  }

  return(
    <Card>
      <CardImg src={testImage} />
      <Title>{props.frame.frame_name}</Title>
      <CardButton>Edit</CardButton>
      <CardButton>Duplicate</CardButton>
      <CardButton>Export</CardButton>
      <CardButton onClick={deleteFrame}>Delete</CardButton>
    </Card>
  )
}