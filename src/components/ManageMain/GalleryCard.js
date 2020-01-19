import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';

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
  let [myReady, setMyReady] = useState(false)
  let ready = useSelector(state=>state.edit.ready);

  function deleteFrame() {
    dispatch({type: 'DELETE_FRAME', payload: props.frame.id});
  }
  function editFrame() {
    dispatch({type: 'GET_SAVED_FRAME', payload: props.frame.id});
    setMyReady(true);
  }

  function goToEdit() {
    if (ready && myReady) {
      setMyReady(false);
      dispatch({type: 'SET_EDIT_READY', payload: false})
      history.push('/edit');
    }
  }

  function exportFrame() {
    dispatch({type: 'EXPORT_FRAME', payload: props.frame.id});
  }
  

  return(
    <Card>
      <CardImg src={props.frame.bkg_url} />
      <Title>{props.frame.frame_name}</Title>
      {goToEdit()}
      <CardButton className="button-primary" onClick={editFrame}>Edit</CardButton>
      <CardButton>Duplicate</CardButton>
      <CardButton className="button-confirm" onClick={exportFrame}>Export</CardButton>
      <CardButton className="button-reject" onClick={deleteFrame}>Delete</CardButton>
    </Card>
  )
}