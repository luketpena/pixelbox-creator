import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import FramePlaceholder from '../../images/frame-placeholder.png';

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
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
`;

const Title = styled.h3`
  color: var(--color-text-light);
  font-family: var(--font-input);
  margin: 0;
`;

export default function GalleryCard(props) {

  const dispatch = useDispatch();
  const {history} = useReactRouter();
  let [myReady, setMyReady] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  let ready = useSelector(state=>state.edit.ready);
  let alert = useSelector(state=>state.errors.appMessage);

  function deleteFrame() {
    dispatch({type: 'DELETE_FRAME', payload: props.frame.id});
    alertCancel();
  }
  function editFrame() {
    dispatch({type: 'GET_SAVED_FRAME', payload: props.frame.id});
    setMyReady(true);
  }

  useEffect(()=>{
    if (ready && myReady) {
      setMyReady(false);
      dispatch({type: 'SET_EDIT_READY', payload: false})
      history.push('/edit');
    }

    if (alert.active && alertActive) {
      switch(alert.response) {
        case 'neutral': alertCancel(); break;
        case 'reject': deleteFrame(); break;
      }
    }
  },[dispatch,myReady,history,ready,alert]);

  function alertCancel() {
    setAlertActive(false);
    dispatch({type: 'RESET_APP_ALERT'});
  }

  function exportFrame() {
    dispatch({type: 'EXPORT_FRAME', payload: props.frame.id});
  }
  
  function duplicateFrame() {
    dispatch({type: 'DUPLICATE_FRAME', payload: props.frame.id});
    setMyReady(true);
  }

  function clickDelete() {
    setAlertActive(true);
    dispatch({
      type: 'SET_APP_ALERT',
      payload: {
        response: 'none',
        title: `Delete frame?`,
        message: '',
        neutral: 'Cancel',
        reject: 'Delete'
      }
    })
  }

  return(
    <Card>
      <CardImg src={(props.frame.bkg_url? props.frame.bkg_url : FramePlaceholder)} alt="Frame preview image."/>
      <Title>{props.frame.frame_name}</Title>
      <CardButton className="button-primary" onClick={editFrame}>Edit</CardButton>
      <CardButton onClick={duplicateFrame}>Duplicate</CardButton>
      <CardButton className="button-confirm" onClick={exportFrame}>Export</CardButton>
      <CardButton className="button-reject" onClick={clickDelete}>Delete</CardButton>
    </Card>
  )
}