import React, {Component} from 'react';
import $ from 'jquery';
import './pixelbox.css';

const verbose = true;


let pageSize = [$(window).width(),$(window).height()];
let mousePos = [0,0]; //actual coordinates
let mouseMov = [0,0]; //movement from -1 to 1
let frameList = [];

let smoothing = .05;
let smoothingActive = false;
let framerate = 10;
let pixelSnap = true;

$(document).ready(()=>{
  pixelboxRun();
})




function pbSetSmoothing (val) {smoothing = val;}
function pbSetPixelSnap (val) {pixelSnap = val;}
function pbSetFramerate (val) {framerate = val;}
function pbSetCss (frame,layer,prop,set) {
  //Target a layer of a frame and set a CSS property based on arguments
  $(frame).data('attr').layers[layer].css(prop,set);
}

function pbRemoveLayer (index) {

}

function pbFindFrame (frame) {
  return frameList.find( (el,i)=> el.frame=frame ).target;
}



function pixelboxRun () {
  //Adjust what the page size is
  $(window).resize(()=>{
    pageSize = [$(window).width(),$(window).height()];
  });
  //Find the mousePos and calculate mouseMov
  $(document).mousemove((event)=>{
    mousePos = [event.pageX,event.pageY];
    if (smoothing===1) {
      mouseMov = [
        ((mousePos[0]/pageSize[0])*2)-1,
        ((mousePos[1]/pageSize[1])*2)-1
      ];
    } else if (!smoothingActive) {
      smoothingActive = true;
      pbSmoothMove();
    }
    //Update frames
    pbUpdate();
  });
}
function pbUpdate () {
  //console.log('Update:',pbFindFrame('#frame-1'));

  for (let i=0; i<frameList.length; i++) {

    const frame = frameList[i];

    //Find the positions of the frame
    for (let j=0; j<frame.layerCount; j++) {
      let layerX = 0,
          layerY = 0;
      switch(pixelSnap) {
        case false:
          layerX = -(frame.overlap[0]*(frame.str[j]*frame.ratio[0])*mouseMov[0]);
          layerY = -(frame.overlap[1]*(frame.str[j]*frame.ratio[1])*mouseMov[1]);
          break;
        case true:
          layerX = -Math.round( (frame.overlap[0]*(frame.str[j]*frame.ratio[0])*mouseMov[0])/frame.ratio[0] )*frame.ratio[0];
          layerY = -Math.round( (frame.overlap[1]*(frame.str[j]*frame.ratio[1])*mouseMov[1])/frame.ratio[1] )*frame.ratio[1];
          break;
      }

      frame.layers[j].css('transform',`translate(${layerX}px,${layerY}px`);
    } //End of layer loop
  } //End of frame loop
}
function pbSmoothMove () {
  //Find the position we want to move towards
  let targetPos = [
    ((mousePos[0]/pageSize[0])*2)-1,
    ((mousePos[1]/pageSize[1])*2)-1
  ];

  //Default to not wanting to move
  let active = false;
  //Check both x and y current position,
  //if they are far from the target, then increment towards it and activate
  for (let i=0; i<=1; i++) {
    if (Math.abs(mouseMov[i]-targetPos[i])>.001) {
      mouseMov[i] += (targetPos[i]-mouseMov[i])*smoothing;
      active = true;
    }
  }
  //If it never activated, snap mouse position to the target position
  if (!active) {
    mouseMov[0] = targetPos[0];
    mouseMov[1] = targetPos[1];
    smoothingActive = false;
  } else {
    //Call itself at a framerate if far enough away
    setTimeout(pbSmoothMove,framerate);
  }
  //Update the frame positions
  pbUpdate();
}


class pixelbox extends Component {
  static test() {
    console.log('pixelbox test');
  }  

  static createFrame (target,bkg,images,str,size,overlap,display) {
    if (verbose) console.log('Creating Pixelbox frame...');
    
    //Find the number of layers based on the arguments provided
    const layerCount = Math.min(images.length,str.length);
    //Find the ratio of the img to the frame size
    const ratio = [display[0]/size[0],display[1]/size[1]];
  
    //Add the background to the frame
    $(target).addClass('pb-frame');
    $(target).css('background',`url(${bkg})`);
    $(target).css('background-size',`${display[0]}px ${display[1]}px`);
    $(target).css('width',display[0]);
    $(target).css('height',display[1]);
  
    let layerSize = [(size[0]+(overlap[0]*2))*ratio[0],(size[1]+(overlap[1]*2))*ratio[1]];
  
    //Create the layer jQuery objects
    const layers = [];
    for (let i=0; i<layerCount; i++) {
      //Create and style the layers
      const newLayer = $(`<div class='pb-layer'></div>`);
      newLayer.css('background',`url(${images[i]})`);
      newLayer.css('background-size',`${layerSize[0]}px ${layerSize[1]}px`);
      newLayer.css('background-position','center');
      newLayer.css('width',layerSize[0]);
      newLayer.css('height',layerSize[1]);
      newLayer.css('left',-(overlap[0]*ratio[0]));
      newLayer.css('top',-(overlap[1]*ratio[1]))
      console.log('Full width:',display[0]+(overlap[0]*ratio[0]));
      //Add the layers to the array and the frame
      layers.push(newLayer);
      $(target).append(newLayer);
    }
  
    //Create the attributes object
    const attr = {target,bkg,images,str,size,display,overlap,layers,layerCount,ratio};
    console.log('Attributes:',attr)
    //Save the attributes to the frame's data
    $(target).data('attr',attr);
    //Save the frame attributes to the list of frames
    frameList.push(attr);
    return target;
  }

}

export default pixelbox;
