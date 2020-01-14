import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const InBkg = styled.input`
  width: 100%;
  box-sizing : border-box;
`;

//-----< Component Function >-----\\
export default function DetailsFrameMain() {

  //>> Set up hooks
  const dispatch = useDispatch();
  const frame = useSelector(state=>state.edit);

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
    <div id="details-frame-main">
      <label>
        Background url: 
        <InBkg 
          className="details-input"
          type="text" 
          value={bkg_url}
          onChange={(event)=>setBkg_url(event.target.value)}
          onBlur={()=>handleBlur('bkg_url')}
          onKeyPress={handleKeyPress}
        />
      </label>
          
      <div id="details-frame-main-inputs">
        <table>
          <tbody>
            <tr>
              <td>Framerate:</td>
              <td>
                <input 
                  type="number" 
                  className="input-with-unit details-input"
                  value={framerate}
                  onChange={(event)=>setFramerate(event.target.value)}
                  onBlur={()=>handleBlur('framerate')}
                  onKeyPress={handleKeyPress}
                />
                <span className="input-unit">fps</span>
                </td>
            </tr>
            
            <tr>
              <td>Smoothing:</td>
              <td>
                <input 
                  type="number" 
                  className="input-with-unit details-input"
                  value={smoothing}
                  onChange={(event)=>setSmoothing(event.target.value)}
                  onBlur={()=>handleBlur('smoothing')}
                  onKeyPress={handleKeyPress}
                />
              </td>
            </tr>
            
            <tr>
              <td>Pixelsnap:</td>
              <td>
                <input 
                  type="checkbox"
                  checked={pixelsnap}
                  onChange={togglePixelsnap}
                />
              </td>
            </tr>
            
            <tr>
              <td>Hide overflow:</td>
              <td>
                <input 
                  type="checkbox"
                  checked={pixelsnap}
                  onChange={togglePixelsnap}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

