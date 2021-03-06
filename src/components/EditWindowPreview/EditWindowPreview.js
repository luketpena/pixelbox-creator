import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports -----\\
import PreviewBar from './PreviewBar';
import PreviewFrame from './PreviewFrame';

const ExtendPreview = styled.div`
  background-color: var(--color-shadow-faded);
  border: 2px dashed var(--color-primary-faded);
  position: absolute;
  box-shadow: 0 0 32px 0 var(--color-bkg-light);
`;
const PreviewArea = styled.div`
  position: relative;
  grid-area: preview;
  position: relative;
  
`;
const PreviewItems = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -50;
  overflow: hidden;
`;
const PreviewBkg = styled.div`
  background-color: var(--color-bkg-main);
  position: absolute;
  box-shadow: inset 0 0 100px 50px var(--color-shadow-faded);
  width: 100%;
  height: 100%;
  left:0;
  top: 0;
  z-index: -100;
`;

export default function EditWindowPreview() {

  const dispatch = useDispatch();

  //>> Access reducer
  const frame = useSelector(state=>state.edit);

  //>> Generates a key that triggers a component mount
  function generateKey() { return 10*Math.random();}

  //>> Calculate the ratio used for the extend size
  let ratio = [
    frame.display[0]/frame.size[0],
    frame.display[1]/frame.size[1]
  ]
  //>> Define size styles for the extend preview
  let style_extend = {
    width: frame.display[0]+(frame.extend[0]*ratio[0])*4,
    height: frame.display[1]+(frame.extend[1]*ratio[1])*4,
  }

  function deselectLayer() {
    if (frame.select!==-1) {
      dispatch({type: 'SET_LAYER_SELECT', payload: -1})
    }
  }
  
  //>> Render
  return (
    <PreviewArea onClick={deselectLayer}>

      <PreviewBkg />
      <PreviewBar />

      <PreviewItems>
        <ExtendPreview style={style_extend} key={generateKey()} />
        <PreviewFrame key={generateKey()}/>
      </PreviewItems>
    </PreviewArea>
  )
}