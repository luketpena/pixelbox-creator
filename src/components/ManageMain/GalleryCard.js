import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';

const testImage = 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/116770670/original/281f85ad141b056fc82fa8058134a86421c61817/paint-you-a-beautiful-pixel-art-landscape.png';

const Card = styled.div`
  background-color: var(--color-bkg-light);
  width: 256px;
  margin: 8px;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  box-shadow: 0 4px 16px 0px var(--color-shadow-main);
`;
const CardButton = styled.button`
  margin: 4px;
  width: 45%;
  &:hover {
    box-shadow: none;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height 128px;
  object-fit: cover;

`;

const Title = styled.h3`
  color: var(--color-text-light);
  font-family: var(--font-input);
  margin: 0;
`;

export default function GalleryCard(props) {

  const dispatch = useDispatch();
  const {history} = useReactRouter();

  function deleteFrame() {
    dispatch({type: 'DELETE_FRAME', payload: props.frame.id});
  }
  function editFrame() {
    dispatch({type: 'GET_SAVED_FRAME', payload: props.frame.id});
    history.push('/edit')
  }

  return(
    <Card>
      <CardImg src={props.frame.bkg_url} />
      <Title>{props.frame.frame_name}</Title>
      <CardButton className="button-primary" onClick={editFrame}>Edit</CardButton>
      <CardButton>Duplicate</CardButton>
      <CardButton className="button-confirm">Export</CardButton>
      <CardButton className="button-reject" onClick={deleteFrame}>Delete</CardButton>
    </Card>
  )
}