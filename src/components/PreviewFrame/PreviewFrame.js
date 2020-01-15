import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import pb from '../../pixelbox';

export default function PreviewFrame() {
  //>> Connecting to edit reducer
  const frame = useSelector(state=>state.edit);

  //>> On change / mount creation of Pixelbox
  useEffect (()=> {
    pb.setGlobals(frame.smoothing,frame.framerate,frame.pixelsnap);
    pixelboxInit();
  });

  //>> Generating a new Pixelbox
  function pixelboxInit() {
    pb.createFrame(
      '#preview-frame',
      frame.bkg_url,
      frame.layerData,
      frame.size,
      frame.extend,
      frame.display,
    );
  }

  //>> Render
  return (<div id="preview-frame"></div>)
}