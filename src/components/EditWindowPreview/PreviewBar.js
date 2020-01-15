import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const NameInput = styled.input`
  background: none;
  margin-left: 16px;
  outline: none;
  min-width: 128px;
  max-width: 512px;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-text-dark);
  font-family: var(--font-header);
  font-size: 32px;
  color: var(--color-text-dark);
`;

const BarContainer = styled.div`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,.25);
  box-shadow: 0 0 16px 0 var(--color-shadow-main);
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  grid-template-areas: "main return";
  grid-template-columns: 1fr auto;
  align-items: center;
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
  let frame = useSelector(state=>state.edit);
 
  //>> Handle input changes
  function handleChange (event) {
    dispatch({
      type: 'SET_FRAME_NAME',
      payload: event.target.value
    })
  }

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
        <BarButton onClick={saveFrame} className={(!frame.saved)? "button-confirm" : ""}>Save</BarButton>
        <BarButton>Export</BarButton>
      </BarSecMain>
      
      <BarSecReturn>
        <BarButton>Return to Control Panel</BarButton>
      </BarSecReturn> 
    </BarContainer>
  )
}