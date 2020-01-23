import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const InBkg = styled.input`
  width: 100%;
  box-sizing : border-box;
`;

const InputList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  label {
    margin-right: 8px;
  }
  li {
    display: flex;
    align-items: center;
    margin: 4px 0;
    label {
      width: 128px;
      text-align: right;
    }
  }
`;

const Container = styled.div`
  padding-left: 16px;
  label {
    color: var(--color-text-darkest);
    font-family: var(--font-input);
  }
`;

const Checkbox = styled.div`
  color: #CCC;
  transition: color .2s;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

//-----< Component Function >-----\\
export default function DetailsFrameMain() {

  //>> Set up hooks
  const dispatch = useDispatch();
  const frame = useSelector(state=>state.edit);

  console.log('Rendered frame:',frame);
  

  //>> Set up state
  const [bkg_url, setBkg_url] = useState(frame.bkg_url);
  const [framerate, setFramerate] = useState(frame.framerate);
  const [smoothing, setSmoothing] = useState(frame.smoothing);
  const [pixelsnap, setPixelsnap] = useState(frame.pixelsnap);

  //>> Pushes input changes to reducer on blur
  function handleBlur(prop) {
    switch(prop) {
      case 'bkg_url': dispatch({type: 'SET_FRAME_BKG', payload: bkg_url}); break;
      case 'framerate': dispatch({type: 'SET_FRAME_FRAMERATE', payload: Number(framerate) }); break;
      case 'smoothing': dispatch({type: 'SET_FRAME_SMOOTHING', payload: Number(smoothing) }); break;
      default: break;
    }  
  }

  //>> Toggles blur on pressing enter
  function handleKeyPress(event) {
    switch(event.key) {
      case 'Enter': 
        document.activeElement.blur();
        break;
      default: break;
    }
  }

  //>> Toggles pixelsnap and sends it to both state and the reducer
  function togglePixelsnap() {
    setPixelsnap(!pixelsnap)
    dispatch({type: 'SET_FRAME_PIXELSNAP', payload: !pixelsnap });
  }

  //>> Render
  return (
    <Container>
      <label htmlFor="in-background">Background url:</label>
        <InBkg 
          className="details-input"
          id="in-background"
          type="text" 
          value={bkg_url}
          onChange={(event)=>setBkg_url(event.target.value)}
          onBlur={()=>handleBlur('bkg_url')}
          onKeyPress={handleKeyPress}
        />
      
          
      <ListBox>
        <InputList>
          <li>
            <label htmlFor="in-framerate">Framerate:</label>
            <input 
              type="number" 
              id="in-framerate"
              className="input-with-unit details-input"
              value={framerate}
              onChange={(event)=>setFramerate(event.target.value)}
              onBlur={()=>handleBlur('framerate')}
              onKeyPress={handleKeyPress}
            />
            <span className="input-unit">ms</span>
          </li>

          <li>
            <label htmlFor="in-smoothing">Smoothing:</label>
            <input 
              type="number" 
              id="in-smoothing"
              className="input-with-unit details-input"
              value={smoothing}
              onChange={(event)=>setSmoothing(event.target.value)}
              onBlur={()=>handleBlur('smoothing')}
              onKeyPress={handleKeyPress}
            />
          </li>
        </InputList>
        <InputList>
          <li>
            <label htmlFor="in-pixelsnap">Pixelsnap:</label>
            <Checkbox>
              <FontAwesomeIcon icon={(pixelsnap? faCheckSquare : faSquare)} onClick={togglePixelsnap}/>
            </Checkbox>
          </li>

          <li>
            <label htmlFor="in-hide">Hide overflow:</label>
            <Checkbox>
              <FontAwesomeIcon icon={(pixelsnap? faCheckSquare : faSquare)} onClick={togglePixelsnap}/>
            </Checkbox>
          </li>
        </InputList>
      </ListBox>

    </Container>
  )
}

