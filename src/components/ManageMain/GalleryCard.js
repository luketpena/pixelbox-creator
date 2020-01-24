import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import FramePlaceholder from '../../images/frame-placeholder.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
  
  width: 256px;
  margin: 8px 8px 72px 8px;
  position: relative;
`;
const CardButton = styled.button`
  margin: 4px;
  width: 45%;
  &:hover {
    box-shadow: none;
  }
`;

const CardContent = styled.div`
  background-color: var(--color-bkg-light);
  box-shadow: 0 4px 4px 0px var(--color-shadow-main);
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const CardImg = styled.img`
  width: 100%;
  height 128px;
  object-fit: cover;

  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  z-index: 10;
`;

const Title = styled.h3`
  color: var(--color-text-light);
  font-family: var(--font-input);
  margin: 8px;
  grid-area: title;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SlideBar = styled.div`
  height: 64px;
  padding-top: 32px;
  position: absolute;
  bottom: ${(props=>props.active? '-64px' : '0')};
  background-color: var(--color-bkg-main);
  border-radius: 0 0 8px 8px;
  transition: all .3s;
  transition-timing-function: cubic-bezier(0, 0.96, .48, 1.3);
  box-shadow: ${(props=>props.active? '0 4px 4px -2px var(--color-shadow-main)' : 'none')};
`;

const SlideButton = styled.div`
  grid-area: slide;
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: var(--color-text-light-faded);
  transition: color .2s;
  &:hover {
    cursor: pointer;
    color: var(--color-text-light);
  }
`;

const TitleBar = styled.div`
  display: grid;
  grid-template-areas: "title slide";
  grid-template-columns: 1fr auto;
`;

export default function GalleryCard(props) {

  const dispatch = useDispatch();
  const {history} = useReactRouter();
  let [myReady, setMyReady] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [slideActive, setSlideActive] = useState(false);
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
      <CardContent>
        <CardImg src={(props.frame.bkg_url? props.frame.bkg_url : FramePlaceholder)} alt="Frame preview image."/>
        <TitleBar>
          <Title>{props.frame.frame_name}</Title>
          <SlideButton onClick={()=>setSlideActive(!slideActive)}>
            <FontAwesomeIcon icon={faEllipsisH}/>
          </SlideButton>
        </TitleBar>
      </CardContent>
      <SlideBar active={slideActive}>
        <CardButton className="button-primary" onClick={editFrame}>Edit</CardButton>
        <CardButton onClick={duplicateFrame}>Duplicate</CardButton>
        <CardButton className="button-confirm" onClick={exportFrame}>Export</CardButton>
        <CardButton className="button-reject" onClick={clickDelete}>Delete</CardButton>
      </SlideBar>
    </Card>
  )
}