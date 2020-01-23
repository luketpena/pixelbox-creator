import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

//-----< Styling >-----\\
const RowTitle = styled.td`
  font-family: var(--font-input);
  text-align: right;
  color: var(--color-text-darkest);
`;
const RowInput = styled.input`
  width: 64px;

`;
const TableData = styled.td`
  width: 88px;

`;
const RowX = styled.td`
  font-family: monospace;
  padding-left: 12px;
  color: var(--color-text-dark);
`;

//-----< Component Function >-----\\
export default function SizeInputRow(props) {

  //>> Set up hooks
  const dispatch = useDispatch();
  let frame = useSelector(state=>state.edit);

  //>> Set up state
  const [width, setWidth] = useState(frame[props.sizeType][0]);
  const [height, setHeight] = useState(frame[props.sizeType][1]);

  //>> On input blur, send the local input values to the reducer
  function handleBlur () {
    switch(props.sizeType) {
      case 'size': dispatch({type: 'SET_FRAME_SIZE', payload: [Number(width),Number(height)]}); break;
      case 'extend': dispatch({type: 'SET_FRAME_EXTEND', payload: [Number(width),Number(height)]}); break;
      case 'display': dispatch({type: 'SET_FRAME_DISPLAY', payload: [Number(width),Number(height)]}); break;
      default: break;
    }
  }

  //>> On pressing enter, blur the currently selected input
  function handleKeyPress (event) {
    switch(event.key) {
      case 'Enter': 
        document.activeElement.blur();
        break;
      default: break;
    }
  }

  //>> Render
  return (
    <tr>
      <RowTitle>{props.title}:</RowTitle>

      <TableData>
      
        <RowInput 
          type="number" 
          className="input-with-unit details-input" 
          value={width}
          onChange={(event)=>setWidth(event.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
        <span className="input-unit">px</span>
      </TableData>

      <RowX><FontAwesomeIcon icon={faTimes}/></RowX>

      <TableData>
        <RowInput 
          type="number" 
          className="input-with-unit details-input" 
          value={height}
          onChange={(event)=>setHeight(event.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
        <span className="input-unit">px</span>
      </TableData>
    </tr>
  )
}