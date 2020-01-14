import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function PreviewBar () {

  let dispatch = useDispatch();
  let frame = useSelector(state=>state.edit);
 
  function handleChange (event) {
    dispatch({
      type: 'SET_FRAME_NAME',
      payload: event.target.value
    })
  }

  return (
    <div id="preview-bar">
      <div id="preview-bar-main">
        <input 
          type="text" 
          placeholder="Frame Name"
          value={frame.frame_name}
          onChange={(event)=>handleChange(event)}
        />
        <button>Save</button>
        <button>Export</button>
      </div>
      <div id="preview-bar-return">
        <button>Return to Control Panel</button>
      </div> 
    </div>
  )
}