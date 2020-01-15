import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//-----< Component Imports -----\\
import PreviewBar from './PreviewBar';
import PreviewFrame from './PreviewFrame';

const ExtendPreview = styled.div`
  background-color: var(--color-shadow-faded);
  border-radius: 16px;
  position: absolute;
`;
const PreviewArea = styled.div`
  background-color: white;
  box-shadow: inset 0 0 100px 50px var(--color-shadow-faded);
  
  grid-area: preview;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function EditWindowPreview() {

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
    width: frame.display[0]+(frame.extend[0]*ratio[0])*2,
    height: frame.display[1]+(frame.extend[1]*ratio[1]),
  }
  
  //>> Render
  return (
    <PreviewArea>
      <PreviewBar />
      <ExtendPreview style={style_extend} key={generateKey()} />
      <PreviewFrame key={generateKey()}/>
    </PreviewArea>
  )
}