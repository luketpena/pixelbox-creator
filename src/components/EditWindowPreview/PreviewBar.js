import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useReactRouter from 'use-react-router';
import styled from 'styled-components';

const NameInput = styled.input`
  background: none;
  margin-left: 16px;
  outline: none;
  min-width: 128px;
  max-width: 512px;
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--color-bkg-main);
  font-family: var(--font-header);
  font-size: 32px;
  color: var(--color-text-light);
`;

const BarContainer = styled.div`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: rgba(0,0,0,.1);
  box-shadow: 0 0 16px 0 var(--color-shadow-main);
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  grid-template-areas: "main return";
  grid-template-columns: 1fr auto;
  align-items: center;

  
`;

const ReturnButton = styled.button`
  height: 24px;
  padding: 0 24px;
  margin: 0 8px;
  white-space: nowrap;
`;

const BarSecMain = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BarSecReturn = styled.div`
  grid-area: return;
`;

const BarButton = styled.button`
  height: 24px;
  padding: 0 24px;
  margin: 0 8px;
  
`;

export default function PreviewBar() {
  

  //>> Setup hooks
  let dispatch = useDispatch();
  const {history} = useReactRouter();

  let frame = useSelector(state=>state.edit);
  let alert = useSelector(state=>state.errors.appMessage);

 
  //>> Handle input changes
  function handleChange (event) {
    dispatch({
      type: 'SET_FRAME_NAME',
      payload: event.target.value
    })
  }

  useEffect(()=>{
   
    if (alert.active) {
      switch(alert.response) {
        case 'neutral': alertCancel(); break;
        case 'reject': goToControlPanel(); break;
      }
    }
  },[dispatch, history, frame, alert])

  function saveFrame() {
    if (frame.id===-1) {
      dispatch({
        type: 'POST_NEW_FRAME',
        payload: frame
      });
    } else {
      dispatch({
        type: 'SAVE_FRAME',
        payload: frame
      })
    }
  }

  function returnToControlPanel() {
    if (frame.saved) {
      goToControlPanel();
    } else {
      dispatch({
        type: 'SET_APP_ALERT',
        payload: {
          response: 'none',
          title: `Exit with unsaved work?`,
          message: 'All unsaved changes will be discarded.',
          neutral: 'Back to Editor',
          reject: 'Exit'
        }
      })
    }
  }

  function alertCancel() {
    dispatch({type: 'RESET_APP_ALERT'});
  }

  function goToControlPanel() {
    dispatch({type: 'SET_EDIT_READY', payload: false})
    history.push('/manage');
  }

  function exportFrame() {
    const exportFrame = {
      frame_name: frame.frame_name,
      id: frame.id,
      bkg_url: frame.bkg_url,
      layerData: frame.layerData,
      size_x: frame.size[0],
      size_y: frame.size[1],
      extend_x: frame.extend[0],
      extend_y: frame.extend[1],
      display_x: frame.display[0],
      display_y: frame.display[1],
      smoothing: frame.smoothing,
      framerate: frame.framerate,
      pixelsnap: frame.pixelsnap,
    }
    dispatch({type: 'EXPORT_EDIT_FRAME', payload: exportFrame})
  }

  //>> Render
  return (
    <BarContainer>
      
      <BarSecMain>
        <NameInput 
          type="text" 
          placeholder="Frame Name"
          value={frame.frame_name}
          onChange={(event)=>handleChange(event)}
        />
        <BarButton onClick={saveFrame} className={(!frame.saved)? "button-confirm" : "button-default"}>Save</BarButton>
        <BarButton onClick={exportFrame}>Export</BarButton>
      </BarSecMain>
      
      <BarSecReturn>
        <ReturnButton onClick={returnToControlPanel}>Return to Control Panel</ReturnButton>
      </BarSecReturn> 
    </BarContainer>
  )
}